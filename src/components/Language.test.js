import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Language from './Language'

afterEach(cleanup)

describe('<Language />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Language />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Lisää kieli'
    )
  })

  test('renders input for language', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(1)
  })

  test('renders submit button', () => {
    const button = component.container.querySelector('.language-add-button')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })

})