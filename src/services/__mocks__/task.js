const tasks = [
  {
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
  },

  {
    id: 2,
    name: 'toinen testitehtävä',
    assignmentText: 'testitehtävänanto nro 2',
    supervisorInstructions: 'myös toiset testiohjeet',
    gradingScale: 'testiarvosteluperusteet2',
    creatorName: 'nooraTestiluoja',
    creatorEmail: 'testiposti@noora',
    ageGroup: {
      name: 'toinen-ikäryhmä',
    },
    category: {
      category: 'testikategorianro2',
    },
    language: {
      language: 'testikielisuomi',
    },
    rules: {
      rules: 'testisäännöt2',
    },
    pending: false,
  },
]

const getOneTask = (id) => Promise.resolve(tasks[0])

const getTasks = () => Promise.resolve(tasks)


export default { getOneTask, getTasks }
