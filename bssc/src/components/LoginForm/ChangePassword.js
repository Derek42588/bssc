import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../reducers/usersReducer'
import { useHistory, NavLink } from 'react-router-dom'
import './LoginForm.css'
import { setNotification } from '../../reducers/notificationReducer'



const ChangePassword = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newPasswordOne, setPasswordOne] = useState('')
  const [newPasswordTwo, setPasswordTwo] = useState('')

  const history = useHistory()

  const submit = async (event) => {
    event.preventDefault()

    const changed = await props.changePassword({
        variables: {username, password, newPasswordOne, newPasswordTwo}
    })

    if (changed) {

        props.setNotification(`Password changed, please log in again!`, 5)
        history.push('/login')

        
    }
  }

  return (
    <div className = "loginForm">
      <h2>Change Password</h2>
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
        <div>
          new password <input
            type='password'
            value={newPasswordOne}
            onChange={({ target }) => setPasswordOne(target.value)}
          />
        </div>
        <div>
          enter new password again <input
            type='password'
            value={newPasswordTwo}
            onChange={({ target }) => setPasswordTwo(target.value)}
          />
        </div>
        <button type='submit'>change password</button>
      </form>
      <NavLink exact to = '/login/'>login</NavLink>
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
const ConnectedChangePassword = connect(
  mapStateToProps, mapDispatchToProps
  )(ChangePassword)

export default ConnectedChangePassword
