'use strict'

const express = require('express')
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')
const http = require('http')
const { makeExecutableSchema } = require('graphql-tools')

const PORT = 5050
const app = express()
const server = http.createServer(app)

const typeDefs = `
  type Query{
    books: [Book]
  }
  type Book{
    title: String!,
    description: String!
    authorName: String!
  }
`

const Books = [
  {
    title: 'El principito',
    description: 'El principito es una novela corta y la obra más famosa del escritor y aviador francés Antoine de Saint-Exupéry',
    authorName: 'Antoine de Saint-Exupéry'
  },
  {
    title: 'las aventuras de tom sawyer',
    description: 'Las aventuras de Tom Sawyer es una novela del autor estadounidense Mark Twain publicada en 1876',
    authorName: 'Mark Twain'
  }
]

const resolvers = {
  Query:{
    books: () => Books
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`)
})