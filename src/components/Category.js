import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import categoryService from '../services/category'



const Category = () => {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [modifiedCategoryName, setModifiedCategoryName] = useState('')
  const [modifiedCategoryId, setModifiedCategoryId] = useState ('')
  const [categories, setCategories] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)

  useEffect(() => {
    categoryService.getCategories().then((response) => {
      setCategories(response)
    })
  }, [])

  const handleCategoryAdd = async (event) => {
    event.preventDefault()
    try {
      const addedCategory = await categoryService.addCategory({
        category: newCategoryName
      })
      setNewCategoryName('')
      setCategories(categories.concat(addedCategory))
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCategoryDelete = async (category) => {
    try {
      await categoryService.deleteCategory(category.id)
      setCategories(categories.filter(c => c.id !== category.id))
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCategoryModify = async (event) => {
    event.preventDefault() 
    const modifiedCategory = {id: modifiedCategoryId, name: modifiedCategoryName}
    try {
      await categoryService.editCategory(modifiedCategory)
      setModifyVisible(false)
      setCategories(categories.map(category => category.id !== modifiedCategory.id ? category : modifiedCategory))
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const hideWhenVisible = { display: modifyVisible ? 'none' : '' }
  const showWhenVisible = { display: modifyVisible ? '' : 'none' }

  const handleShowModify = (category) => {
    setModifyVisible(true)
    setModifiedCategoryId(category.id)
    setModifiedCategoryName(category.name)
  }
  
  
  
  return (
    <div className="category-form" >
      
      <h2>Lisää kategoria</h2>
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleCategoryAdd}>
        <div>
          <input
            className="category"
            type="text"
            value={newCategoryName}
            name="Category"
            placeholder="Kategoria"
            onChange={({ target }) => setNewCategoryName(target.value)}
          />
        </div>
        <button type="submit" className="category-add-button">Lisää</button>
      </form>

      {categories.map((category) => (
        <div key={category.id}>{category.name}
          <button style={hideWhenVisible} onClick={() => handleCategoryDelete(category)}>Poista</button>
          <button style={hideWhenVisible} onClick={() => handleShowModify(category)}>Muokkaa</button>
        </div>))
      }
      <div style={showWhenVisible}>
        < form onSubmit={handleCategoryModify} >
          <h3>Muokkaa Kategoriaa</h3>
          <div>
            <input
              className="category"
              type="text"
              value={modifiedCategoryName}
              name="Category"
              onChange={({ target }) => setModifiedCategoryName(target.value)}
            />
          </div>
          <div>
            <button type="submit" >Tallenna muutos</button>
          </div>
        </form>
        <button onClick={() => setModifyVisible(false)} className="return-button">Peruuta</button>
      </div>

    </div>



  )
}

export default Category
