import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Rule from './Rule'

jest.mock('../services/rule')

afterEach(cleanup)

const rules = [
  {
    id: '1',
    name: 'säännöt1',
    acceptedCategories: [ { id: '1', name: 'kategoria1' }, { id: '2', name: 'kategoria2' }]
  },
  {
    id: '2',
    name: 'säännöt2',
    acceptedCategories: [ { id: '2', name: 'kategoria2' }, { id: '3', name: 'pendingkategor' }]
  },
  {
    id: '3',
    name: 'testisäännöt true',
    acceptedCategories: [ { id: '1', name: 'kategoria1' }, { id: '3', name: 'pendingkategor' }]
  },
]

const categories = [
  {
    id: '1',
    name: 'kategoria1',
  },
  {
    id: '2',
    name: 'kategoria2',
  },
  {
    id: '3',
    name: 'pendingkategory',
  },
]

describe('<Rule />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Rule rules={rules} setRules={'not null'} categories={categories} />,
    )
  })

  test('renders submit button for ruleAdding', () => {
    const button = component.container.querySelector('.rule-add-button')
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
