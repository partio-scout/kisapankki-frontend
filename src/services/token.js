let token = null

const getToken = () => token

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getToken, setToken }
