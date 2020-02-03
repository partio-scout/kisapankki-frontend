import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Rule from './Rule'

afterEach(cleanup)

describe('<Rule />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Rule />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Lisää sääntö',
    )
  })

  test('renders input for rule', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(1)
  })

  test('renders submit button', () => {
    const button = component.container.querySelector('.task-add-button')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })
})
