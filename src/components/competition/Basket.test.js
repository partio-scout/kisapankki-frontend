import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement, act, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Basket from './Basket'


jest.mock('../../services/series')
jest.mock('../../services/category')
jest.mock('../../services/rule')

afterEach(cleanup)

const tasks = [
  {
    id: 1,
    name: 'tehtävä1',
    assignmentText: 'testitehtävänanto',
    supervisorInstructions: 'testiohjeet',
    gradingScale: 'testiarvosteluperusteet',
    creatorName: 'testiluoja',
    creatorEmail: 'testiposti',
    series: [{
      id: '1',
      name: 'sarja1',
    }],
    category: {
      id: '1',
      name: 'kategoria1',
    },
    language: {
      id: '1',
      name: 'kieli1',
    },
    rules: {
      id: '1',
      name: 'säännöt1',
    },
    pending: false,
    views: 5,
    ratingsAVG: 3,
    created: '2020-03-23T19:54:27.358+00:00'
  },

  {
    id: 2,
    name: 'tehtävä2',
    assignmentText: 'testitehtävänanto nro 2',
    supervisorInstructions: 'myös toiset testiohjeet',
    gradingScale: 'testiarvosteluperusteet2',
    creatorName: 'nooraTestiluoja',
    creatorEmail: 'testiposti@noora',
    series: [{
      id: '2',
      name: 'sarja2',
    }],
    category: {
      id: '2',
      name: 'kategoria2',
    },
    language: {
      id: '2',
      name: 'kieli2',
    },
    rules: {
      id: '2',
      name: 'säännöt2',
    },
    pending: false,
    views: 0,
    ratingsAVG: 4,
    created: '2020-03-23T19:53:27.358+00:00'
  },
]

describe('<Basket />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <Basket tasks={tasks} />
      </Router>,
    )
  })

  test('basket shows inputs for competition', async () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs.length).toBe(5)
  })

  test('basket shows tasks for competition', async () => {
    await waitForElement(
      () => component.container.querySelector('.task-list-item'),
    )

    const tasks = component.container.querySelectorAll('.task-list-item')
    expect(tasks.length).toBe(2)
  })

  test('basket has pdf button', async () => {
    const button = component.container.querySelector('.make-pdfs')

    expect(component.container).toContainElement(button)
  })

})