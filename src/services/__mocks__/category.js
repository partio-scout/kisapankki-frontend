const categories = [
  {
    id: '1',
    name: 'testikategoria',
  },
  {
    id: '2',
    name: 'testikategorianro2',
  },
  {
    id: '3',
    name: 'pendingkategory',
  },
]

const getCategories = () => {
  return Promise.resolve(categories)
}

export default { getCategories }