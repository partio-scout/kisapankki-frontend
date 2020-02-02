import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Category from './Category'

afterEach(cleanup)

describe('<Category />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Category />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Lisää kategoria',
    )
  })

  test('renders input for category', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(1)
  })

  test('renders submit button', () => {
    const button = component.container.querySelector('.category-add-button')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })
})
