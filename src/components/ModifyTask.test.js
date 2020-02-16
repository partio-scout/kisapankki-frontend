import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import ModifyTask from './ModifyTask'

jest.mock('../services/category')
jest.mock('../services/rule')
jest.mock('../services/ageGroup')
jest.mock('../services/language')

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
    ageGroup: {
      name: 'testi-ikäryhmä',
    },
    category: {
      category: 'testikategoria',
    },
    language: {
      language: 'testikieli',
    },
    rules: {
      rules: 'testisäännöt',
    },
    pending: false,
  }

  beforeEach(() => {
    component = render(
      <ModifyTask task={task} />,
    )
  })

  test('renders heading', () => {
    expect(component.container).toHaveTextContent(
      'Muokkaa tehtävää',
    )
  })

  test('renders inputs for task', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(3)
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
    expect(button).toHaveTextContent('Tallenna tehtävä')
  })
})
