import React, { useState } from 'react'
import Notification from './Notification'
import categoryService from '../services/category'

const Category = () => {
  const [category, setCategory] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleCategoryAdd = async (event) => {
    event.preventDefault()
    try {
      await categoryService.addCategory({
        category,
      })
      setCategory('')
    } catch (exception) {
      setErrorMessage('Jotain meni vikaan')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div className="category-form">
      <h2>Lisää kategoria</h2>
      <Notification message={errorMessage} />
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
    </div>
  )
}

export default Category
