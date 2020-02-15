const config = require('./utils/config')
const { ApolloServer, AuthenticationError, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const { graphqlExpress } = require ('apollo-server-express')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const Provider = require ('./models/provider')
const User = require ('./models/users')
const Message = require ('./models/message')
const jwt = require ('jsonwebtoken')
const { PubSub, withFilter } = require('apollo-server')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


// type Subscription {
//   alertAdded(provider: String!): Alert
//   alertRemoved: String
//   messageAdded: Message
//   messageRemoved: String
// }

  const typeDefs = gql`

  type Message {
    message: String!
    author: String!
  }
  type Alert {
    alert: String!
    provider: String!
  }

    type Subscription {
      alertAdded(provider: String!): Alert
      alertRemoved: String
      messageAdded: Message
      messageRemoved: String
    }

    type Provider {
        name: String!
        alerts: [String]
    }
  

    type User {
      username: String!
      name: String!
      permissions: [String]
      id: ID!
    }

    type Token {
      value: String!
      username: String!
      name: String!
      permissions: [String]
    }
    
    type Query {
        hello: String!
        allProviders: [Provider!]!
        getAlerts(name: String!): Provider!
        me: User
        getMessages: [Message!]!
    }

    type Mutation {
        addProvider(
            name: String!
            alerts: [String]
        ): Provider
        linkProviders(
            name: String!
            providerToLink: String!
        ): Provider
        createUser(
           username: String!
           name: String!
           password: String!
           permissions: [String]
        ): User
        login(
          username: String!
          password: String!
        ): Token
        changePassword(
          username: String!
          password: String!
          newPasswordOne: String!
          newPasswordTwo: String!
        ): Token
        addAlert(
          name: String!
          alert: String!
        ): Provider
        removeAlert(
          name: String!
          alert: String!
        ): Provider
        addMessage(
          message: String!
        ): Message
        removeMessage(
          message: String!
        ): String
    }
  `

  const resolvers = {
      Query: {
          hello: () => {return "world"},
          allProviders: async (root, args) => {
              return Provider.find({}).populate('linkedProvider')
          },
          getAlerts: async (root, args) => {
              const providerAlerts = Provider.findOne({name: args.name})
              return providerAlerts
          },
          me: (root, args, context) => {
            return context.currentUser
          },
          getMessages: async (root, args) => {
            return Message.find({})
          }
      },
      Mutation: {
          addProvider: async (root, args, { currentUser }) => {
              // const otherProvider = await Provider.findOne({name: args.linkedProvider})

              if (!currentUser) {
                throw new AuthenticationError("not authenticated")
              }

              const provider = new Provider({
                  name: args.name,
                  // title: args.title,
                  // npi: args.npi,
                  // schedule: args.schedule,
                  // coordinator: args.coordinator,
                  alerts: args.alerts
              })

              // if (!otherProvider){
              //     provider.linkedProvider = null
              // } else {
              //     provider.linkedProvider = otherProvider
              // }

              try {
                await provider.save()
              } catch (error) {
                throw new UserInputError (error.message, {
                  invalidArgs: args,
                })
              }

              return provider
          },
          linkProviders: async (root, args, { currentUser }) => {

              if (!currentUser) {
                throw new AuthenticationError("not authenticated")
              }
            
              const otherProvider = await Provider.findOne({name: args.providerToLink})
              const providerToChange = await Provider.findOne({name: args.name})

              if (otherProvider && providerToChange) {
                providerToChange.linkedProvider = otherProvider

                try {
                    await providerToChange.save()
                } catch (error) {
                    throw new UserInputError (error.message, {
                        invalidArgs: args
                    })
                }
              }

              return providerToChange
          },
          addAlert: async (root, args, { currentUser }) => {
            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
            }

            if (!(currentUser.permissions.includes(args.name)) && !(currentUser.permissions.includes('admin'))){
              throw new AuthenticationError("You don't have permission to do that!")
            }
          
            const provider = await Provider.findOne({name: args.name})
            provider.alerts = provider.alerts.concat(args.alert)

            try {
              await provider.save()
            } catch (error) {
              throw new UserInputError(error.message, {
                invalidArgs: args
              })
            }

            const alertToAdd = { alert: args.alert, provider: args.name}


            pubsub.publish('ALERT_ADDED', {
              alertAdded: alertToAdd
            })

            return provider
          },
          addMessage: async (root, args, { currentUser} ) => {
            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
            }

            if (!(currentUser.permissions.includes('admin'))){
              throw new AuthenticationError("You don't have permission to do that!")
            }

            const message = new Message({
              message: args.message,
              author: currentUser.name
            })

            try {
              await message.save()
            } catch(error) {
              throw new UserInputError(error.message, {
                invalidArgs: args
              })
            }


            pubsub.publish('MESSAGE_ADDED', {messageAdded: {message: args.message, author: currentUser.name}})


            return message
          },
          removeMessage: async (root, args, { currentUser }) => {
            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
            }

            if (!(currentUser.permissions.includes(args.name)) && !(currentUser.permissions.includes('admin'))){
              throw new AuthenticationError("You don't have permission to do that!")
            }

            const messageToRemove = await Message.findOneAndDelete({message: args.message})

            if (messageToRemove) {
              pubsub.publish('MESSAGE_REMOVED', {messageRemoved: messageToRemove.message})
              return "Deleted " + messageToRemove.message
            } else {
              return "Could not find " + args.message
            }


          },
          removeAlert: async (root, args, { currentUser }) => {
            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
            }

            if (!(currentUser.permissions.includes(args.name)) && !(currentUser.permissions.includes('admin'))){
              throw new AuthenticationError("You don't have permission to do that!")
            }

            const provider = await Provider.findOne({name: args.name})
            provider.alerts = provider.alerts.filter(a => a !== args.alert)

            try {
              await provider.save()
            } catch(error) {
              throw new UserInputError(error.message, {
                invalidArgs: args
              })
            }

            pubsub.publish('ALERT_REMOVED', {alertRemoved: args.alert})

            
            return provider

          },
          createUser: async (root, args, context) => {

            const saltRounds = 10

            const passwordHash = await bcrypt.hash(args.password, saltRounds)

            const user = new User({
              username: args.username,
              name: args.name,
              permissions: args.permissions,
              passwordHash
            })

            try {
              await user.save()
          } catch (error) {
              throw new UserInputError (error.message, {
                  invalidArgs: args
              })
          }

          return user
          },
          login: async (root, args, context) => {
            const user = await User.findOne({username: { $regex: new RegExp("^" + args.username + "$", "i") }})
            const passwordCorrect = user === null 
              ? false 
              : await bcrypt.compare(args.password, user.passwordHash)

            if (!(user && passwordCorrect)) {
              throw new UserInputError("invalid credentials")
            }

            const userForToken = {
              username: user.username,
              id: user._id
            }

            return { 
              value: jwt.sign(userForToken, process.env.SECRET),
              username: user.username,
              name: user.name,
              permissions: user.permissions
            }
            
          },
          changePassword: async (root, args) => {
            const user = await User.findOne({username: { $regex: new RegExp("^" + args.username + "$", "i") }})
            const matchingNew = (args.newPasswordOne === args.newPasswordTwo)
            const passwordCorrect = user === null
              ? false
              : await bcrypt.compare(args.password, user.passwordHash)

              if (!(user && passwordCorrect)) {
                throw new UserInputError("invalid credentials")
              }

              if (!matchingNew) {
                throw new UserInputError("passwords don't match!")
              }

              const saltRounds = 10

              const passwordHash = await bcrypt.hash(args.newPasswordOne, saltRounds)

              user.passwordHash = passwordHash

              try {
                await user.save()
            } catch (error) {
                throw new UserInputError (error.message, {
                    invalidArgs: args
                })
            }

            const userForToken = {
              username: user.username,
              id: user._id
            }

              return { value: jwt.sign(userForToken, process.env.SECRET),
                username: user.username,
                name: user.name,
                permissions: user.permissions}
          },
          
      },
      Subscription: {
        alertAdded: {
          subscribe: withFilter(
              () => pubsub.asyncIterator(['ALERT_ADDED']),
              (payload, variables) => {
                return payload.alertAdded.provider === variables.provider
              }
          )
        },
        // alertAdded: {
        //   subscribe: () => pubsub.asyncIterator(['ALERT_ADDED'])
        // },
        alertRemoved: {
          subscribe: () => pubsub.asyncIterator(['ALERT_REMOVED'])
        },
        messageAdded: {
          subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED'])
        },
        messageRemoved: {
          subscribe: () => pubsub.asyncIterator(['MESSAGE_REMOVED'])
        }

      }
  }
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({ req }) => {
      const auth = req ? req.headers.authorization: null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser } 
      }
    }
  })

  
  server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)

  })
  