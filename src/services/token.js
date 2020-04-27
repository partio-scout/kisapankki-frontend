let token = null

const getToken = () => token

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const setTokenNull = () => {
  token = null
}

export default { getToken, setToken, setTokenNull }
