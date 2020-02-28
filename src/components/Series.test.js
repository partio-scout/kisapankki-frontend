import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Series from './Series'

afterEach(cleanup)

describe('<Series />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Series />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Lisää sarja',
    )
  })

  test('renders input for series', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(1)
  })

  test('renders submit button', () => {
    const button = component.container.querySelector('.series-submit-button')
    expect(button).toHaveTextContent(
      'Lisää',
    )
  })
})
