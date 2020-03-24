import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import FrontPage from './FrontPage'

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
    ratingsAVG: '3',
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
    ratingsAVG: '4',
    created: '2020-03-23T19:53:27.358+00:00'
  },
]

describe('<FrontPage />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <FrontPage tasks={tasks} />
      </Router>,
    )
  })

  test('renders new tasks in correct order', async () => {
    await waitForElement(
      () => component.container.querySelector('.new-item'),
    )

    const tasks = component.container.querySelectorAll('.new-item')
    expect(tasks.length).toBe(2)

    expect(tasks[0]).toHaveTextContent(
      'tehtävä1',
    )

    expect(tasks[1]).toHaveTextContent(
      'tehtävä2',
    )
  })

  test('renders favorite tasks in correct order', async () => {
    await waitForElement(
      () => component.container.querySelector('.new-item'),
    )

    const tasks = component.container.querySelectorAll('.favorite-item')
    expect(tasks.length).toBe(2)

    expect(tasks[0]).toHaveTextContent(
      'tehtävä2',
    )

    expect(tasks[1]).toHaveTextContent(
      'tehtävä1',
    )
  })

})
