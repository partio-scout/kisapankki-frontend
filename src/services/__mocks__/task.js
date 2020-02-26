const tasks = [
  {
    id: 1,
    name: 'testitehtävä',
    assignmentText: 'testitehtävänanto',
    supervisorInstructions: 'testiohjeet',
    gradingScale: 'testiarvosteluperusteet',
    creatorName: 'testiluoja',
    creatorEmail: 'testiposti',
    series: [{
      id: '1',
      name: 'testi-ikäryhmä',
    }],
    category: {
      id: '1',
      name: 'testikategoria',
    },
    language: {
      id: '1',
      name: 'testikieli',
    },
    rules: {
      id: '1',
      name: 'testisäännöt',
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
    series: [{
      id: '2',
      name: 'toinen-ikäryhmä',
    }],
    category: {
      id: '2',
      name: 'testikategorianro2',
    },
    language: {
      id: '2',
      name: 'testikielisuomi',
    },
    rules: {
      id: '2',
      name: 'testisäännöt2',
    },
    pending: false,
  },
]

const pendingTasks = [
  {
    id: 1,
    name: 'pending',
    assignmentText: 'text',
    supervisorInstructions: 'ohjeet pending',
    gradingScale: 'arvostelu pending',
    creatorName: 'pend',
    creatorEmail: 'true@true',
    series: [{
      id: '3',
      name: 'testi-ikäryhmä pending',
    }],
    category: {
      id: '3',
      name: 'pendingkategory',
    },
    language: {
      id: '3',
      name: 'pending',
    },
    rules: {
      id: '3',
      name: 'testisäännöt true',
    },
    pending: true,
  },
]

const getOneTask = (id) => Promise.resolve(tasks[0])

const getTasks = () => Promise.resolve(tasks)

const getPendingTasks = () => Promise.resolve(pendingTasks)

export default { getOneTask, getTasks, getPendingTasks }
