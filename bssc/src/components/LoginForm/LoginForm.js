import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../reducers/usersReducer'
import { useHistory, NavLink } from 'react-router-dom'
import './LoginForm.css'
import { setNotification } from '../../reducers/notificationReducer'


const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const submit = async (event) => {
    event.preventDefault()

    const result = await props.login({
      variables: { username, password }
    })

    if (result) {
      props.setNotification(`Logged in as ${result.data.login.name} `, 5)
      const token = result.data.login.value
      props.loginUser(result.data.login)
      props.setToken(token)
      localStorage.setItem('bssc-user-token', token)
      localStorage.setItem('loggedBsscAppUser', JSON.stringify(result.data.login))
      history.push('/')


    }
  }

  return (
    <div className = "loginForm">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
      <NavLink exact to = '/changePassword/'>changePassword</NavLink>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

const mapDispatchToProps = {
    loginUser,
    setNotification
}
const ConnectedLoginForm = connect(
  mapStateToProps, mapDispatchToProps
  )(LoginForm)

export default ConnectedLoginForm
