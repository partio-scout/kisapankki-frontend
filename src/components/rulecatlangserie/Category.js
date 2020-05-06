import React, { useState, Fragment } from 'react'
import Notification from '../misc/Notification'
import categoryService from '../../services/category'

const Category = ({ categories, setCategories }) => {
  const [newCategoryName, setNewCategoryName] = useState('')
  const [modifiedCategoryName, setModifiedCategoryName] = useState('')
  const [modifiedCategoryId, setModifiedCategoryId] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [modifyVisible, setModifyVisible] = useState(false)

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
      if (window.confirm(`Haluatko poistaa kategorian: ${category.name}`)) {
        await categoryService.deleteCategory(category.id)
        setCategories(categories.filter(c => c.id !== category.id))
      }
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

  const handleShowModify = (category) => {
    setModifyVisible(true)
    setModifiedCategoryId(category.id)
    setModifiedCategoryName(category.name)
  }

  return (
    <div className="category-form" >
      <Notification message={errorMessage} type="error" />

      {categories && categories.map((category) => (
        <div className="category-list-item" key={category.id}>
          {modifyVisible && modifiedCategoryId === category.id ?
            <div className="category-form-item">
              <form onSubmit={handleCategoryModify} >
                <div className="item-modify">
                  <input
                    className="category"
                    type="text"
                    value={modifiedCategoryName}
                    name="Category"
                    onChange={({ target }) => setModifiedCategoryName(target.value)}
                  />
                  <div className="item-buttons-save">
                    <button type="submit" className="category-save-button">Tallenna</button>
                    <button onClick={() => setModifyVisible(false)}>Peruuta</button>
                  </div>
                </div>
              </form>
            </div>
            :
            <Fragment>
              <p className="item-name">{category.name}</p>
              <div className="item-buttons">
                <button onClick={() => handleShowModify(category)} className="modify-button">Muokkaa</button>
                <button onClick={() => handleCategoryDelete(category)} className="delete-button">Poista</button>
              </div>
            </Fragment>
          }
        </div>))
      }

      <form onSubmit={handleCategoryAdd} className="add-form">
        <div className="item-add">
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
    </div>

  )
}

export default Category
