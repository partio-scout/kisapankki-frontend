import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import categoryService from '../services/category'
import { useHistory } from 'react-router-dom'


const Category = () => {
  const [category, setCategory] = useState('')
  const [updatedCategory, setUpdatedCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)
  const history = useHistory()

  useEffect(() => {
    categoryService.getCategories().then((response) => {
      setCategories(response)
    })
  }, [])

  const handleCategoryAdd = async (event) => {
    event.preventDefault()
    try {
      await categoryService.addCategory({
        category,
      })
      setCategory('')
      history.push('/lisaa_pudotusvalikkoon')
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
      history.push('/lisaa_pudotusvalikkoon')
    } catch (exeption) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCategoryModify = async (event) => {
    event.preventDefault()
    try {
      await categoryService.editCategory({
        category,
      })
      setCategory('')
      setUpdatedCategory('')

      setTimeout(() => {
        //setMessage(null)

      }, 1000)
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        // setErrorMessage(null)
      }, 5000)
    }
  }

  const hideWhenVisible = { display: modifyVisible ? 'none' : '' }
  const showWhenVisible = { display: modifyVisible ? '' : 'none' }

  

  return (
    <div className="category-form">
      <h2>Lisää kategoria</h2>
      <Notification message={errorMessage} type="error" />
      <form onSubmit={handleCategoryAdd}>
        <div>
          <input
            className="category"
            type="text"
            value={category}
            name="Category"
            placeholder="Kategoria"
            onChange={({ target }) => setCategory(target.value)}
          />
        </div>
        <button type="submit" className="category-add-button">Lisää</button>
      </form>

      {categories.map((category) => (
        <div key={category.id}>{category.name}
          <button className="delete-button" style={hideWhenVisible} onClick={() => handleCategoryDelete(category)}>Poista</button>
          <button className="modify-button" style={hideWhenVisible} onClick={() => setModifyVisible(true)}>Muokkaa</button>
        </div>))
      }
      <div className="edit-rule-form" style={showWhenVisible}>
        < form onSubmit={handleCategoryModify} >
          <h3>Muokkaa Kategoriaa</h3>
          <div>
            <input
              type="text"
              value= {category}
              name="Category"
              onChange={({ target }) => setCategory(target.value)}
            />
          </div>
          <div>
            <button type="submit" className="save-task-button">Tallenna muutos</button>

          </div>
        </form>
        <button onClick={() => setModifyVisible(false)} className="return-button">Peruuta</button>
      </div>





    </div>
  )
}

export default Category
