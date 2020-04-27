import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Task from './Task'
import Comment from './Comment'

jest.mock('../services/task')
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}))

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

afterEach(cleanup)

describe('<Task />', () => {
  let component
  let match = {
    params: {
      id: 1
    }
  }
  let user = 'not null'

  beforeEach(() => {
    component = render(<Task match={match} user={user} rules={rules} seriess={series} languages={languages} />)
  })

  test('renders task name', () => {
    expect(component.container).toHaveTextContent(
      'tehtävä1',
    )
  })

  test('renders task assignment', () => {
    expect(component.container).toHaveTextContent(
      'testitehtävänanto',
    )
  })

  test('renders task instructions', () => {
    expect(component.container).toHaveTextContent(
      'testiohjeet',
    )
  })

  test('renders task scale', () => {
    expect(component.container).toHaveTextContent(
      'testiarvosteluperusteet',
    )
  })

  test('renders task creator name', () => {
    expect(component.container).toHaveTextContent(
      'testiluoja',
    )
  })

  test('renders task creator email', () => {
    expect(component.container).toHaveTextContent(
      'testiposti',
    )
  })

  test('renders task age group', () => {
    expect(component.container).toHaveTextContent(
      'sarja1',
    )
  })

  test('renders task category', () => {
    expect(component.container).toHaveTextContent(
      'kategoria1',
    )
  })

  test('renders task rules', () => {
    expect(component.container).toHaveTextContent(
      'säännöt1',
    )
  })

  test('renders delete button', () => {
    const button = component.container.querySelector('.delete-button')

    expect(component.container).toContainElement(button)
  })

  test('after clicking modify button <ModifyTask /> is rendered', () => {
    const button = component.container.querySelector('.modify-view-button')

    fireEvent.click(button)

    const form = component.container.querySelector('.modify-form')
    expect(component.container).toContainElement(form)
  })

  test('<ModifyTask /> is not rendered after clicking return', () => {
    const button = component.container.querySelector('.modify-view-button')

    fireEvent.click(button)


    const form = component.container.querySelector('.modify-form')
    expect(component.container).toContainElement(form)

    const returnButton = component.container.querySelector('.return-button')

    fireEvent.click(returnButton)

    expect(component.container).not.toContainElement(form)
  })

})