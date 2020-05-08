**Backend API**

# Tasks

## Get all accepted tasks

| Type  | GET  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |Fetch and return all tasks   |
| Expected updates  |   |
##### Data
```
{
  series: [
  {
  name: "Sudenpennut",
  color: "#f5ea2e",
  id: "5e4ec2033661d81858295d91"
  }
  ],
  files: [ ],
  ratings: [
  0,
  0,
  0,
  0,
  0
  ],
  name: "sfsfs",
  assignmentText: "<p>sfsfsf</p> ",
  assignmentTextMD: "sfsfsf",
  supervisorInstructions: "",
  supervisorInstructionsMD: "",
  gradingScale: "",
  gradingScaleMD: "",
  creatorName: "fsf",
  creatorEmail: "sfsf",
  pending: false,
  category: {
  name: "Retkeilytaidot",
  id: "5e73f8830b30432ec0e500be"
  },
  language: {
  name: "Suomi",
  id: "5e4ec1f73661d81858295d8f"
  },
  rules: {
  name: "Nykyiset",
  id: "5e4ec1ed3661d81858295d8d"
  },
  views: 1,
  ratingsAVG: 0,
  ratingsAmount: 0,
  created: "2020-05-05T23:40:35.161Z",
  id: "5eb1f97328585747d4a05270"
}
```

## Get all pending tasks

| Type  | GET  |
|---|---|
| Uri | api/task/pending  |
| DataType | json  |
| Comments  |Fetch and return task that are waiting for admin acceptance   |
| Expected updates  |   |

##### Data
```
{
  series: [
  {
  name: "Sudenpennut",
  color: "#f5ea2e",
  id: "5e4ec2033661d81858295d91"
  }
  ],
  files: [ ],
  ratings: [
  0,
  0,
  0,
  0,
  0
  ],
  name: "sfsfs",
  assignmentText: "<p>sfsfsf</p> ",
  assignmentTextMD: "sfsfsf",
  supervisorInstructions: "",
  supervisorInstructionsMD: "",
  gradingScale: "",
  gradingScaleMD: "",
  creatorName: "fsf",
  creatorEmail: "sfsf",
  pending: false,
  category: {
  name: "Retkeilytaidot",
  id: "5e73f8830b30432ec0e500be"
  },
  language: {
  name: "Suomi",
  id: "5e4ec1f73661d81858295d8f"
  },
  rules: {
  name: "Nykyiset",
  id: "5e4ec1ed3661d81858295d8d"
  },
  views: 1,
  ratingsAVG: 0,
  ratingsAmount: 0,
  created: "2020-05-05T23:40:35.161Z",
  id: "5eb1f97328585747d4a05270"
}
``` 

## Delete task

| Type  | DELETE  |
|---|---|
| Uri | api/task/:id  |
| DataType | json  |
| Comments  | requires valid token   |
| Expected updates  |   |


## See single task

| Type  | GET  |
|---|---|
| Uri | api/task/:id  |
| DataType | json  |
| Comments  | return task with specified id  |
| Expected updates  |   |

##### Data

```
{
  series: [
  {
  name: "Sudenpennut",
  color: "#f5ea2e",
  id: "5e4ec2033661d81858295d91"
  }
  ],
  files: [ ],
  ratings: [
  0,
  0,
  0,
  0,
  0
  ],
  name: "sfsfs",
  assignmentText: "<p>sfsfsf</p> ",
  assignmentTextMD: "sfsfsf",
  supervisorInstructions: "",
  supervisorInstructionsMD: "",
  gradingScale: "",
  gradingScaleMD: "",
  creatorName: "fsf",
  creatorEmail: "sfsf",
  pending: false,
  category: {
  name: "Retkeilytaidot",
  id: "5e73f8830b30432ec0e500be"
  },
  language: {
  name: "Suomi",
  id: "5e4ec1f73661d81858295d8f"
  },
  rules: {
  name: "Nykyiset",
  id: "5e4ec1ed3661d81858295d8d"
  },
  views: 1,
  ratingsAVG: 0,
  ratingsAmount: 0,
  created: "2020-05-05T23:40:35.161Z",
  id: "5eb1f97328585747d4a05270"
}
```

## Edit task

| Type  | PUT  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

## Add task

| Type  | POST  |
|---|---|
| Uri | api/task  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

##### Data

```
{
  series: [
  {
  name: "Sudenpennut",
  color: "#f5ea2e",
  id: "5e4ec2033661d81858295d91"
  }
  ],
  files: [ ],
  ratings: [
  0,
  0,
  0,
  0,
  0
  ],
  name: "sfsfs",
  assignmentText: "<p>sfsfsf</p> ",
  assignmentTextMD: "sfsfsf",
  supervisorInstructions: "",
  supervisorInstructionsMD: "",
  gradingScale: "",
  gradingScaleMD: "",
  creatorName: "fsf",
  creatorEmail: "sfsf",
  pending: false,
  category: {
  name: "Retkeilytaidot",
  id: "5e73f8830b30432ec0e500be"
  },
  language: {
  name: "Suomi",
  id: "5e4ec1f73661d81858295d8f"
  },
  rules: {
  name: "Nykyiset",
  id: "5e4ec1ed3661d81858295d8d"
  },
  views: 1,
  ratingsAVG: 0,
  ratingsAmount: 0,
  created: "2020-05-05T23:40:35.161Z",
  id: "5eb1f97328585747d4a05270"
}
```

## Accept task

| Type  | PUT  |
|---|---|
| Uri | api/task/:id/accept  |
| DataType | json  |
| Comments  | requires valid token   |
| Expected updates  |Change tasks pending state   |

## Search and return non pending tasks with specified search term

| Type  | POST  |
|---|---|
| Uri | api/task/search  |
| DataType | json  |
| Comments  |   |
| Expected updates  |  |

## Create and send PDF made from single task

| Type  | POST  |
|---|---|
| Uri | api/task/:id/pdf  |
| DataType | json  |
| Comments  |   |
| Expected updates  |  |

## Create multiple PDFs and return them as zip file

| Type  | POST  |
|---|---|
| Uri | api/task/pdf  |
| DataType | json  |
| Comments  |   |
| Expected updates  |  |

## Add rating to specified task

| Type  | POST  |
|---|---|
| Uri | api/task/:id/rate  |
| DataType | json  |
| Comments  | pdate tasks rating list, amount and average and returns updated rating data  |
| Expected updates  |  |

# Rules

## Get all rules

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

## Add rule

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

## Delete rule

| Type  | DELETE  |
|---|---|
| Uri | api/rule/:id  |
| DataType | json  |
| Comments  |requires valid token   |
| Expected updates  |   |

## Update rule

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

## Get all languages

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
## Add language

| Type  | POST  |
|---|---|
| Uri | api/language  |
| DataType | json  |
| Comments  |requires valid token    |
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

## Delete language

| Type  | DELETE  |
|---|---|
| Uri | api/language/:id  |
| DataType | json  |
| Comments  |requires valid token    |
| Expected updates  |   |

## Update languages name

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

## Get all categories

| Type  | Get  |
|---|---|
| Uri | api/categories  |
| DataType | json  |
| Comments  | Fetch all categories, populate pointers  |
| Expected updates  |   |

##### Data

```
{
  task: [ ],
  name: "Kätevyys",
  id: "5e73f81a0b30432ec0e500bb"
},
``` 

## Add category

| Type  | POST  |
|---|---|
| Uri | api/categories  |
| DataType | json  |
| Comments  |requires valid token    |
| Expected updates  |   |

##### Data

```
{
  task: [ ],
  name: "Kätevyys",
  id: "5e73f81a0b30432ec0e500bb"
},
```

## Delete category

| Type  | DELETE  |
|---|---|
| Uri | api/categories/:id  |
| DataType | json  |
| Comments  | requires valid token  |
| Expected updates  |    |


# Series

## Get all series

| Type  | GET  |
|---|---|
| Uri | api/series  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |


## Add Series

| Type  | GET  |
|---|---|
| Uri | api/series  |
| DataType | json  |
| Comments  | requires valid token  |
| Expected updates  |   |

## Delete Series

| Type  | DELETE  |
|---|---|
| Uri | api/series  |
| DataType | json  |
| Comments  | requires valid token  |
| Expected updates  |   |

## Update Series

| Type  | PUT  |
|---|---|
| Uri | api/series/:id  |
| DataType | json  |
| Comments  | Update name and color of series   |
| Expected updates  |   |

# Comments 

## Get all comments

| Type  | GET  |
|---|---|
| Uri | api/comment  |
| DataType | json  |
| Comments  |   |
| Expected updates  |   |

```
{
  content: "testi",
  nickname: "testi",
  created: "2020-04-09T14:56:20.974Z",
  pending: false,
  task: "5e7ba15e8e2e1249e8f8772d",
  id: "5e8f379432a1452e383e50d3"
},
```

## Get all comments waiting for acceptance 

| Type  | GET  |
|---|---|
| Uri | api/comments/pending  |
| DataType | json  |
| Comments  |  requires valid token |
| Expected updates  |   |

```
{
  content: "testi",
  nickname: "testi",
  created: "2020-04-09T14:56:20.974Z",
  pending: false,
  task: "5e7ba15e8e2e1249e8f8772d",
  id: "5e8f379432a1452e383e50d3"
},
```

## Get single non pending comment 

| Type  | GET  |
|---|---|
| Uri | api/comment/:id |
| DataType | json  |
| Comments  |   |
| Expected updates  |  |

```
{
  content: "testi",
  nickname: "testi",
  created: "2020-04-09T14:56:20.974Z",
  pending: true,
  task: "5e7ba15e8e2e1249e8f8772d",
  id: "5e8f379432a1452e383e50d3"
},
```

## Add comment 

| Type  | POST  |
|---|---|
| Uri | api/comment |
| DataType | json  |
| Comments  | additions with valid token in request are auto accepted  |
| Expected updates  |  |

```
{
  content: "testi",
  nickname: "testi",
  created: "2020-04-09T14:56:20.974Z",
  pending: false,
  task: "5e7ba15e8e2e1249e8f8772d",
  id: "5e8f379432a1452e383e50d3"
},
```

## Delete comment 

| Type  | DELETE  |
|---|---|
| Uri | api/comment |
| DataType | json  |
| Comments  | requires valid token  |
| Expected updates  |  |

## Accepet comment 

| Type  | PUT  |
|---|---|
| Uri | api/comment/:id/accept |
| DataType | json  |
| Comments  | requires valid token  |
| Expected updates  |  |

# File

## Delete blobs if list is given, Add files to blob storage

| Type  | POST  |
|---|---|
| Uri | api/file |
| DataType | json  |
| Comments  |  |
| Expected updates  |  |

# User 

## Get all saved users

| Type  | GET  |
|---|---|
| Uri | api/user |
| DataType | json  |
| Comments  |  |
| Expected updates  |  |

```
{
  username: "kesti",
  name: "pesti",
  email: "testi@testi.fi",
  allowNotifications: false,
  __v: 0
},
```

## Create new user

| Type  | POST  |
|---|---|
| Uri | api/user |
| DataType | json  |
| Comments  |  |
| Expected updates  |  |

```
{
  username: "kesti",
  name: "pesti",
  email: "testi@testi.fi",
  allowNotifications: false,
  __v: 0
},
```

## Path used to create the first admin user

| Type  | POST  |
|---|---|
| Uri | api/user/adminkey |
| DataType | json  |
| Comments  |  |
| Expected updates  |  |

```
{
  username: "kesti",
  name: "pesti",
  email: "testi@testi.fi",
  allowNotifications: false,
  __v: 0
},
```

## Update user information

| Type  | PUT  |
|---|---|
| Uri | api/user |
| DataType | json  |
| Comments  |  |
| Expected updates  |  |

```
{
  username: "kesti",
  name: "pesti",
  email: "testi@testi.fi",
  allowNotifications: false,
  __v: 0
},
```