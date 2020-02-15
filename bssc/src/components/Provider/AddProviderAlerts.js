import React, { useState } from 'react'
import { connect } from 'react-redux'
import {  useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'

import { setNotification } from '../../reducers/notificationReducer'

import './AddProviderAlerts.css';

const AddProviderAlerts = ({ user, name, setNotification }) => {

const handleError = (error) => {
        setNotification(error.graphQLErrors[0].message, 10)
}

const ADD_ALERT = gql`
    mutation addAlert($name: String!, $alert: String!){
    addAlert(name: $name, alert: $alert) {
      name
      alerts
    }
  }
`
  const [alert, setAlert] = useState('')
  const [addAlert] = useMutation(ADD_ALERT, {
    onError: handleError
  })

  const submit = async (event) => {
    event.preventDefault()

    const result = await addAlert({
      variables: { 
          name: name,
          alert: alert

       }
    })

    if (result) {
        setNotification(`added alert for ${name}: ${alert} `, 5)
    }
    setAlert('')
  }

  if ((user.permissions.includes('admin')) || (user.permissions.includes(name)) ) {

  return (
    <div className = "addAlertForm">
      <h3>Add Alert</h3>
      <form onSubmit={submit}>
        <div className = "inputBar">
          <div>Add Alert</div>
          <textarea
            value={alert}
            onChange={({ target }) => setAlert(target.value)}
          />
           <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
} else {
    return null
}
}
const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

const mapDispatchToProps = {
    setNotification
}
const ConnectedAddProviderAlerts = connect(
  mapStateToProps, mapDispatchToProps
  )(AddProviderAlerts)

export default ConnectedAddProviderAlerts
