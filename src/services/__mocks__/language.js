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

const getLanguages = () => {
  return Promise.resolve(languages)
}

export default { getLanguages }