import React, { useState } from 'react'
import './Messages.css';
import { gql } from 'apollo-boost'
import { connect } from 'react-redux'
import { useQuery, useSubscription, useMutation } from 'react-apollo'
import { setNotification } from '../../reducers/notificationReducer'


const Messages = ({ user, setNotification }) => {
    
const ALL_MESSAGES = gql`

    query getMessages {
      getMessages {
        message
        author
      }
    }
  
  `
  
  const REMOVE_MESSAGE = gql`
      mutation removeMessage($message: String!){
      removeMessage(message: $message)
    }
  `
  
  const ADD_MESSAGE = gql`
      mutation addMessage($message: String!){
      addMessage(message: $message) {
          message
          author
      }
    }
  `
  
  const MESSAGE_ADDED = gql`
    subscription{
        messageAdded {
            message
            author
        }
    }
  `
  
  const MESSAGE_REMOVED = gql`
    subscription{
        messageRemoved
    }
  `
  const messages = useQuery(ALL_MESSAGES)

  useSubscription(MESSAGE_ADDED, {
    onSubscriptionData:() => {

        messages.refetch()
    }
})
  useSubscription(MESSAGE_REMOVED, {
    onSubscriptionData:() => {
        messages.refetch()

    }
})


const submit = async (event) => {
    event.preventDefault()

    const result = await addMessage({
      variables: { 
          message: message
       }
    })

    if (result) {
        setNotification(`added message ${message} `, 5)
    }
    setMessage('')
  }

const handleError = (error) => {
    setNotification(error.graphQLErrors[0].message, 10)
}

const [message, setMessage] = useState('')

const [addMessage] = useMutation(ADD_MESSAGE, {
    onError: handleError
  })

const [removeMessage] = useMutation(REMOVE_MESSAGE, {
    onError: handleError
    })
    
const removeMessageOnClick = async (messageToDelete) => {
        const removed = await removeMessage({
            variables: {
                message: messageToDelete
            }
        })

        return removed
    }

  
  
const showMessages = () => {

    if (messages.loading || (messages.data === undefined)) {
        return null
    }
    return (
        <div className = "messagesContainer">
             
            <div className = "messages">
            {user.permissions.includes('admin') ?
            <div className = "addAlertForm">
                <h3>Add Message</h3>
                <form onSubmit={submit}>
                  <div className = "inputBar">
                    <div>Add Message</div>
                    <textarea
                      value={message}
                      onChange={({ target }) => setMessage(target.value)}

                    />
                     <button type='submit'>Add</button>
                  </div>
                </form>
              </div>
            :
            null
            }
            
            <div className = "messageRow messagesTitle">
                    <div className = "authorBox">
                        Posted By
                    </div>
                    <div className = "messageBox">
                        Message
                    </div>
                </div>
                {((messages.loading) || (messages.data === undefined)) ? null :
                messages.data.getMessages.map(m =>
                <div key = {m.message + m.author} className = "messageRow" >
                    <div className = "authorBox">
                        {m.author}
                    </div>
                    <div className = "messageBox">
                        <div className = "messageBoxMessage">
                        {m.message}
                        </div>
                        {user.permissions.includes('admin') ?
                            <button className = "removeButton" onClick = {() => removeMessageOnClick(m.message)}>Remove Message</button>
                        : null          
                        }
                    </div>
                </div>
                    )
                }
            </div>
        </div>
    )
}
    return (
        <div>
        {showMessages()}
        </div>
    )   
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
  }

const mapDispatchToProps = {
    setNotification
}
  const ConnectedMessages = connect(
    mapStateToProps, mapDispatchToProps
)(Messages)

export default ConnectedMessages