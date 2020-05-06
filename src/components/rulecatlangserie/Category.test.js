import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Category from './Category'

jest.mock('../../services/category')

afterEach(cleanup)

const categories = [
  {
    id: '1',
    name: 'kategoria1',
  },
  {
    id: '2',
    name: 'kategoria2',
  },
  {
    id: '3',
    name: 'pendingkategory',
  },
]

describe('<Category />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Category categories={categories} setCategories={'not null'} />,
    )
  })

  test('renders input for addingCategory', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(1)
  })

  test('renders submit button for categoryAdding', () => {
    const button = component.container.querySelector('.category-add-button')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })

  test('renders modify button', () => {
    const button = component.container.querySelector('.modify-button')
    expect(button).toHaveTextContent(
      'Muokkaa',
    )
  })
  
  test('renders delete button', () => {
    const button = component.container.querySelector('.delete-button')
    expect(button).toHaveTextContent(
      'Poista',
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