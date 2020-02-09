// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let users = {}
let categories = {}
let languages = {}
let ageGroups = {}
let rules = {}
let tasks = {}

const localStorageMock = {
  setItem: (key, item) => {
    users[key] = item
    categories[key] = item
    languages[key] = item
    ageGroups[key] = item
    rules[key] = item
    tasks[key] = item
  },
  getItem: (key) => {
    users[key]
    categories[key]
    languages[key]
    ageGroups[key]
    rules[key]
    tasks[key]

  },
  clear: users = {},
  clear: categories = {},
  clear: languages = {},
  clear: ageGroups = {},
  clear: rules = {},
  clear: tasks = {}
}

const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

Object.defineProperty(window, 'localStorage', { value: localStorageMock })