import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Language from './Language'

jest.mock('../../services/language')

afterEach(cleanup)

const languages = [
  {
    id: '1',
    name: 'suomi1',
  },
  {
    id: '2',
    name: 'suomi2',
  },
  {
    id: '3',
    name: 'ruotsi3',
  },
]

describe('<Language />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Language languages={languages} setLanguages={'not null'} />,
    )
  })


  test('renders input for languageAdd', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(1)
  })

  test('renders submit button for adding new language', () => {
    const button = component.container.querySelector('.language-add-button')
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
