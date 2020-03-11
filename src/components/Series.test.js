import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Series from './Series'

jest.mock('../services/series')

afterEach(cleanup)

describe('<Series />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Series />,
    )
  })

 

  test('renders input for addingSeries and Modifying', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(2)
  })

  test('renders submit button for adding newSerie', () => {
    const button = component.container.querySelector('.series-submit-button')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })

  test('renders submit button for saving editedSerie', () => {
    const button = component.container.querySelector('.serie-save-button')
    expect(button).toHaveTextContent(
      'Tallenna',
    )
  })

  test('renders all series it gets from backend',  () => {
    const categories = component.container.querySelectorAll('.serie-list-item')
    expect(categories.length).toBe(3)
    
    expect(component.container).toHaveTextContent(
      'sarja1',
    )
    expect(component.container).toHaveTextContent(
      'sarja2',
    )

  })
})
