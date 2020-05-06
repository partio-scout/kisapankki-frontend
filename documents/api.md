**Backend API**

# Tasks

# Get all accepted tasks

| Type  | GET  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |Fetch and return all tasks   |
| Expected updates  |   |
##### Data
```
{
  content: "testi",
  nickname: "testi",
  created: "2020-04-09T14:56:20.974Z",
  pending: false,
  task: "5e7ba15e8e2e1249e8f8772d",
  id: "5e8f379432a1452e383e50d3"
}
```

# Get all pending tasks

| Type  | GET  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |Fetch and return task that are waiting for admin acceptance   |
| Expected updates  |   |

##### Data
```
{
  content: "testi",
  nickname: "testi",
  created: "2020-04-09T14:56:20.974Z",
  pending: true,
  task: "5e7ba15e8e2e1249e8f8772d",
  id: "5e8f379432a1452e383e50d3"
}
``` 

# Delete task

| Type  | DELETE  |
|---|---|
| Uri | api/task/:id  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |


# See single task

| Type  | POST  |
|---|---|
| Uri | api/task/:id  |
| DataType | json  |
| Comments  | return task with specified id  |
| Expected updates  |   |

##### Data

```
{
  content: "testi",
  nickname: "testi",
  created: "2020-04-09T14:56:20.974Z",
  pending: true,
  task: "5e7ba15e8e2e1249e8f8772d",
  id: "5e8f379432a1452e383e50d3"
}
```

# Edit task

| Type  | POST  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

# Add task

| Type  | POST  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
  name: 'testi',
  rule: '5e4ec1f33661d81858295d8e',
  category: '5e73f8700b30432ec0e500bd',
  series: [ '5e4ec20f3661d81858295d93' ],
  language: '5e7604f5bff3a05dcd2ffbf0',
  assignmentText: '<p>Testi</p>\n',
  gradingScale: '<p>testi</p>\n',
  creatorName: 'Make',
  creatorEmail: 'timo@timpuri.com',
  supervisorInstructions: '<p>testi</p>\n',
  assignmentTextMD: 'Testi',
  gradingScaleMD: 'testi',
  supervisorInstructionsMD: 'testi',
  files: []
}
```

# Accept task

| Type  | PUT  |
|---|---|
| Uri | api/task/:id/accept  |
| DataType | json  |
| Comments  |   |
| Expected updates  |Change tasks pending state   |

# Search and return non pending tasks with specified search term

| Type  | POST  |
|---|---|
| Uri | api/task/search  |
| DataType | json  |
| Comments  |   |
| Expected updates  |  |

# Create and send PDF made from single task

| Type  | POST  |
|---|---|
| Uri | api/task/:id/pdf  |
| DataType | json  |
| Comments  |   |
| Expected updates  |  |

# Create multiple PDFs and return them as zip file

| Type  | POST  |
|---|---|
| Uri | api/task/pdf  |
| DataType | json  |
| Comments  |   |
| Expected updates  |  |

# Rules

# Get all rules

| Type  | GET  |
|---|---|
| Uri | api/rule  |
| DataType | json  |
| Comments  | Fetch all rules, populate pointers   |
| Expected updates  |  |

##### Data

```
{
  task: [ ],
  acceptedCategories: [
  {
  task: [ ],
  name: "Kädentaidot",
  id: "5ea9eb670b3fef10aceb9e45"
  }
  ],
  name: "Menneet",
  __v: 0,
  id: "5ea9eb830b3fef10aceb9e46"
}
``` 

# Add rule

| Type  | POST  |
|---|---|
| Uri | api/rule  |
| DataType | json  |
| Comments  |requires valid token   |
| Expected updates  |   |

##### Data

```
{
  task: [ ],
  acceptedCategories: [
  {
  task: [ ],
  name: "Kädentaidot",
  id: "5ea9eb670b3fef10aceb9e45"
  }
  ],
  name: "Menneet",
  __v: 0,
  id: "5ea9eb830b3fef10aceb9e46"
}
``` 

# Delete rule

| Type  | DELETE  |
|---|---|
| Uri | api/rule/:id  |
| DataType | json  |
| Comments  |requires valid token   |
| Expected updates  |   |

# Update rule

| Type  | PUT  |
|---|---|
| Uri | api/rule/:id  |
| DataType | json  |
| Comments  |requires valid token   |
| Expected updates  |   |

```
{
  task: [ ],
  acceptedCategories: [
  {
  task: [ ],
  name: "Kädentaidot",
  id: "5ea9eb670b3fef10aceb9e45"
  }
  ],
  name: "Menneet",
  __v: 0,
  id: "5ea9eb830b3fef10aceb9e46"
}
```

# Log in

| Type  | POST  |
|---|---|
| Uri | api/login  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |


# Languages

| Type  | Get  |
|---|---|
| Uri | api/language  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
  task: [ ],
  name: "Ruotsi2",
  __v: 0,
  id: "5ea9eb300b3fef10aceb9e44"
}
``` 
# Add language

| Type  | POST  |
|---|---|
| Uri | api/language  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
  task: [ ],
  name: "Ruotsi2",
  __v: 0,
  id: "5ea9eb300b3fef10aceb9e44"
}
```

# Delete language

| Type  | DELETE  |
|---|---|
| Uri | api/language/:id  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

# Update languages name

| Type  | PUT  |
|---|---|
| Uri | api/language/:id  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
  task: [ ],
  name: "Ruotsi2",
  __v: 0,
  id: "5ea9eb300b3fef10aceb9e44"
}
```

# Categories

# Get all categories

| Type  | Get  |
|---|---|
| Uri | api/categories  |
| DataType | json  |
| Comments  |   |
| Expected updates  |Fetch all categories, populate pointers   |

##### Data

```
{
  task: [ ],
  name: "Kätevyys",
  id: "5e73f81a0b30432ec0e500bb"
},
``` 

# Add category

| Type  | POST  |
|---|---|
| Uri | api/categories  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
  task: [ ],
  name: "Kätevyys",
  id: "5e73f81a0b30432ec0e500bb"
},
```

# Delete category

| Type  | DELETE  |
|---|---|
| Uri | api/categories/:id  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |


# Series

| Type  | GET  |
|---|---|
| Uri | api/series  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |


# Add Series

| Type  | GET  |
|---|---|
| Uri | api/series  |
| DataType | json  |
| Comments  |   |
| Expected updates  |requires valid token   |

# Delete Series

| Type  | DELETE  |
|---|---|
| Uri | api/series  |
| DataType | json  |
| Comments  |   |
| Expected updates  |requires valid token   |

# Update Series

| Type  | PUT  |
|---|---|
| Uri | api/series/:id  |
| DataType | json  |
| Comments  |   |
| Expected updates  |Update name and color of series    |

