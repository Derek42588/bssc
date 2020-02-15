import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useMutation, useApolloClient } from 'react-apollo'
import './App.css';
import { Route, Switch } from 'react-router-dom'
import { gql } from 'apollo-boost'

import Provider from './components/Provider/Provider'
import Providers from './components/Providers/Providers'
import Layout from './hoc/Layout/Layout'
import LoginForm from './components/LoginForm/LoginForm'
import ChangePassword from './components/LoginForm/ChangePassword'
import Notification from './components/Notification/Notification'
import ByBodyPart from './components/Providers/ByBodyPart'
import Messages from './components/Messages/Messages'
import NoMatchRoute from './components/NoMatchRoute/NoMatchRoute'
import Home from './components/Home/Home'
import OurLinks from './components/OurLinks/OurLinks'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'


import { initializeProviders } from './reducers/providersReducer'
import { initializeUser } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import Documentation from './components/Documentation/Documentation';


const LOGIN = gql `
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
      username
      name
      permissions
    }
  }
`

const CHANGE_PASSWORD = gql `
  mutation changePassword($username: String!, $password: String!, $newPasswordOne: String!, $newPasswordTwo: String!){
    changePassword(username: $username, password: $password, newPasswordOne: $newPasswordOne, newPasswordTwo: $newPasswordTwo) {
      value
      username
      name
      permissions
    }
  }
`

const providersWithKeys = [
  {
    key: "Jawa",
    name: "Andrew Jawa"
  },
  {
    key: "Miller",
    name: "Suzanne Miller"
  },
  {
    key: "Rice",
    name: "Sarah Rice"
  },
  {
    key: "Curtis",
    name: "Alan Curtis"
  },
  {
    key: "Ghobrial",
    name: "Irene Ghobrial"
  },
  {
    key: "Braziel",
    name: "Andrew Braziel"
  },
  {
    key: "Richmond",
    name: "John Richmond"
  },
  {
    key: "McKeon",
    name: "Brian McKeon"
  },
  {
    key: "Rand",
    name: "Jason Rand"
  },
    {
      key: "Mithoefer",
      name: "Kai Mithoefer"
    },
    {
      key: "Hofmann",
      name: "Kurt Hofmann"
    },
    {
      key: "Dolloff",
      name: "Lauren Dolloff"
    },
    {
      key: "Slovenkai",
      name: "Mark Slovenkai"
    },
    {
      key: "Martinelli",
      name: "Sheri Martinelli"
    },
    {
      key: "Weitzel",
      name: "Paul Weitzel"
    },
    {
      key: "Pacheco",
      name: "Tom Pacheco"
    },
    {
      key: "Kim",
      name: "Sung Kim"
    },
    {
      key: "Wuerz",
      name: "Thomas Wuerz"
    },
    {
      key: "Wright",
      name: "Stephen Wright"
    },
    {
      key: "Kimball",
      name: "Hervey Kimball"
    },
    {
      key: "Terrono",
      name: "Andrew Terrono"
    },
]

const App = (props) => {

  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBsscAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.value)
      props.initializeUser(user)
    } else {
      props.initializeUser(null)
    }
    props.initializeProviders(providersWithKeys)
  }, [])
  
  // const allProviders = useQuery(ALL_PROVIDERS)

  // const oneProviderAlerts = useQuery(PROVIDER_ALERTS, {
  //   variables: {name: pAlerts}
  // })


  const handleError = (error) => {
    setNotification(error.graphQLErrors[0].message, 10)
  }


  
  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onError: handleError
  })

  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.clearStore()
  }


  const providerByName = (key) => {
    const foundProvider = providersWithKeys.find(provider => provider.key.toUpperCase() === key.toUpperCase())
    return foundProvider
  }

  if (!token) {
    return (
      <div className="App">
      <Layout logout = {logout}>
      <Notification />
      <Switch>
          <Route exact path = "/changePassword"
          render = {() => <ChangePassword changePassword = {changePassword} login = {login} setToken = {(token) => setToken(token)}/>}
          />
          <LoginForm
          login = {login}
          setToken ={(token) => setToken(token)}
          />
        </Switch>
      </Layout>
      {/* {showProviders()} */}

    </div>

    )
  }

  return (
    <div className="App">
      
      <Layout  logout = {logout} >
      <Notification />
      <ScrollToTop />
          <Switch>
            <Route exact path = "/"
            render = {() => <Home /> } />
            <Route exact path = "/provider/:name"
            render = {({ match }) => <Provider chosenProvider ={providerByName(match.params.name)}  />} />
            <Route exact path = "/providers"
            render = {() => <Providers />} />
            <Route exact path = "/login"
            // should those props be in there?? added late
            render = {() => <LoginForm login = {login}
            setToken ={(token) => setToken(token)}/>} />
            <Route exact path = "/changePassword"
            render = {() => <ChangePassword changePassword = {changePassword} login = {login} setToken = {(token) => setToken(token)}/>}
            />
            <Route exact path = "/providers/bybodypart"
            render = {() => <ByBodyPart />} />
            <Route exact path = "/messages"
            render = {() => <Messages />} />
            <Route exact path = "/documentation"
            render = {() => <Documentation />} />
            <Route exact path = "/ourlinks"
            render = {() => <OurLinks />} />
            <Route component = {NoMatchRoute} />
          </Switch>
      </Layout>
      {/* {showProviders()} */}

    </div>


  );
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default connect (mapStateToProps, { initializeProviders, initializeUser, setNotification })(App);
