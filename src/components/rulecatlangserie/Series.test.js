import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Series from './Series'

jest.mock('../../services/series')

afterEach(cleanup)

const series = [
  {
    id: '1',
    name: 'sarja1',
  },
  {
    id: '2',
    name: 'sarja2',
  },
  {
    id: '3',
    name: 'testi-ikäryhmä pending',
  },
]

describe('<Series />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Series series={series} setSeries={'not null'} />
    )
  })

  test('renders input for addingSeries', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(1)
  })

  test('renders submit button for adding newSerie', () => {
    const button = component.container.querySelector('.series-submit-button')
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
