import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import ModifyTask from './ModifyTask'

jest.mock('../../services/category')
jest.mock('../../services/rule')
jest.mock('../../services/series')
jest.mock('../../services/language')
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

describe('<ModifyTask/>', () => {
  let component
  const task = {
    id: 1,
    name: 'testitehtävä',
    assignmentText: 'testitehtävänanto',
    supervisorInstructions: 'testiohjeet',
    gradingScale: 'testiarvosteluperusteet',
    creatorName: 'testiluoja',
    creatorEmail: 'testiposti',
    series: [{
      name: 'testi-ikäryhmä',
    }],
    category: {
      name: 'testikategoria',
    },
    language: {
      name: 'testikieli',
    },
    rules: {
      name: 'testisäännöt',
    },
    pending: false,
  }

  beforeEach(() => {
    component = render(
      <ModifyTask task={task} rules={rules} seriess={series} languages={languages} />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Muokkaa tehtävää',
    )
  })

  test('renders inputs for task', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(7)
  })

  test('renders textareas for task', () => {
    const areas = component.container.querySelectorAll('textarea')
    expect(areas.length).toBe(3)
  })

  test('renders select for task', () => {
    const selects = component.container.querySelectorAll('select')
    expect(selects.length).toBe(4)
  })

  test('renders button for task', () => {
    const button = component.container.querySelector('.save-task-button')
    expect(button).toHaveTextContent('Tallenna')
  })
})
