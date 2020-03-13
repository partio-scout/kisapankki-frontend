import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Rule from './Rule'

jest.mock('../services/rule')

afterEach(cleanup)

describe('<Rule />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Rule />,
    )
  })

  test('renders inputs for  addingRule and editingRule', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(2)
  })

  test('renders submit button for ruleAdding', () => {
    const button = component.container.querySelector('.rule-add-button')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })
  
  test('renders submit button for saving editedRule', () => {
    const button = component.container.querySelector('.rule-save-button')
    expect(button).toHaveTextContent(
      'Tallenna',
    )
  })

  test('renders all rules it gets from backend', () => {
    const categories = component.container.querySelectorAll('.rule-list-item')
    expect(categories.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'säännöt1',
    )
    expect(component.container).toHaveTextContent(
      'säännöt2',
    )

  })
})
