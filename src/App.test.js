import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement, fireEvent, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import FrontPage from './components/FrontPage'

jest.mock('./services/task')

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

describe('<App />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Router>
        <App>
          <FrontPage tasks={tasks} addTaskToBasket={'not null'} />
        </App>
      </Router>,
    )
  })

  test('renders login button in header', () => {
    const button = component.container.querySelector('.login-button-header')
    expect(button).toHaveTextContent(
      'Kirjaudu',
    )
  })

  test('clicking icon adds task to basket', async () => {
    const whiteBasket = component.container.querySelector('.white-basket')
    expect(whiteBasket).not.toHaveTextContent('1')

    await waitForElement(
      () => component.container.querySelector('.black-basket'),
    )

    const blackBaskets = component.container.querySelectorAll('.black-basket')
    act(() => { fireEvent.click(blackBaskets[0])})

    expect(whiteBasket).toHaveTextContent('1')
  })

})
