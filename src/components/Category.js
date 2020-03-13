import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import categoryService from '../services/category'



const Category = () => {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [modifiedCategoryName, setModifiedCategoryName] = useState('')
  const [modifiedCategoryId, setModifiedCategoryId] = useState('')
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
    const modifiedCategory = { id: modifiedCategoryId, name: modifiedCategoryName }
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

      <Notification message={errorMessage} type="error" />
      <form style={hideWhenVisible} onSubmit={handleCategoryAdd}>
        <div>
          <input
            className="category"
            type="text"
            value={newCategoryName}
            name="Category"
            placeholder="Uusi kategoria"
            onChange={({ target }) => setNewCategoryName(target.value)}
          />
          <button type="submit" className="category-add-button">Lisää</button>
        </div>

      </form>

      {categories.map((category) => (
        <div style={hideWhenVisible} className="category-list-item" key={category.id}>{category.name}

          <button style={hideWhenVisible} onClick={() => handleCategoryDelete(category)}>Poista</button>
          <button style={hideWhenVisible} onClick={() => handleShowModify(category)}>Muokkaa</button>

        </div>))
      }
      <div style={showWhenVisible } className="category-form-item">
        < form onSubmit={handleCategoryModify} >
          <div>
            <input
              className="category"
              type="text"
              value={modifiedCategoryName}
              name="Category"
              onChange={({ target }) => setModifiedCategoryName(target.value)}
            />
            <button type="submit" className="category-save-button">Tallenna</button>
            <button onClick={() => setModifyVisible(false)}>Peruuta</button>
          </div>

          <div>

          </div>
        </form>
        
      </div>

    </div>



  )
}

export default Category
