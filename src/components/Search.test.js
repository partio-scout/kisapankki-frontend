import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Search from './Search'

afterEach(cleanup)

describe('<Search />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Search setTests={(msg) => console.log(msg)} />,
    )
  })

  test('renders input field', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(1)
  })

  test('resnders search button', () => {
    expect(component.container).toHaveTextContent(
      'Hae'
    )
  })
})