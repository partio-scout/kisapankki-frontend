// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let users = {}

const localStorageMock = {
  setItem: (key, item) =>{
    users[key] = item
  },
  getItem:(key) => users[key],
  clear: users = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })