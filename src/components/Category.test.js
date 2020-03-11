import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Category from './Category'

jest.mock('../services/category')

afterEach(cleanup)

describe('<Category />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Category />,
    )
  })

  test('renders input for addingCategory and editingCategory', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(2)
  })

  test('renders submit button for categoryAdding', () => {
    const button = component.container.querySelector('.category-add-button')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })
  test('renders submit button for saving editedCategory', () => {
    const button = component.container.querySelector('.category-save-button')
    expect(button).toHaveTextContent(
      'Tallenna',
    )
  })

  test('renders all categories it gets from backend',  () => {
    const categories = component.container.querySelectorAll('.category-list-item')
    expect(categories.length).toBe(3)
    
    expect(component.container).toHaveTextContent(
      'kategoria1',
    )
    expect(component.container).toHaveTextContent(
      'pendingkategory',
    )

  })
})