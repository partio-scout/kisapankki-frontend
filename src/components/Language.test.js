import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Language from './Language'

jest.mock('../services/language')

afterEach(cleanup)

describe('<Language />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Language />,
    )
  })


  test('renders input for languageAdd and languageModify', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(2)
  })

  test('renders submit button for adding new language', () => {
    const button = component.container.querySelector('.language-add-button')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })
  test('renders submit button for languageModify', () => {
    const button = component.container.querySelector('.language-save-button')
    expect(button).toHaveTextContent(
      'Tallenna',
    )
  })

  test('renders all languages it gets from backend',  () => {
    const categories = component.container.querySelectorAll('.language-list-item')
    expect(categories.length).toBe(3)
    
    expect(component.container).toHaveTextContent(
      'suomi1',
    )
    expect(component.container).toHaveTextContent(
      'ruotsi3',
    )

  })
})
