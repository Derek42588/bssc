import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logoutUser } from '../../reducers/usersReducer'
import './Toolbar.css';


const toolbar = (props) => { 

    const onClick = () => {
        props.logoutUser()
        props.logout()
    }

    const showAuthForms = () => {

        if (!((props.user === null))){
            return (
                <li>
                <div className = "logoutButton" key = "Logout" onClick = {onClick}>
                    Logout
                </div>
            </li>
            ) 
        } 
    }
    
    return (
    <nav id = "mainNav">
        <ul>
            <li key = "Home">
                <NavLink exact to = "/">Home</NavLink>
            </li>
            <li key = "Providers" className = "mobileInvisible">
               <NavLink exact to = '/providers/'>Providers</NavLink>
               <ul className = "dropdown">
                   <li>
                        <NavLink exact to = '/providers/byBodyPart'>By Body Part</NavLink>
                    </li>
               </ul>
            </li>
            <li key = "Documentation" className = "mobileInvisible">
            <NavLink exact to = '/documentation/'>Documentation</NavLink>
                
            </li>
            <li key = "Messages" className = "mobileInvisible">
                <NavLink exact to = "/messages/">Messages</NavLink>
            </li>
            <li key = "Our Links" className = "mobileInvisible">
                <NavLink exact to = '/ourlinks'>Our Links</NavLink>
               <ul className = "dropdown">
                   <li>
                        <a href="https://docs.google.com/spreadsheets/d/1wSv8q3auvN6Z20-6vwZmiHyPXniwHPEErAV-ILPZyCc/edit#gid=1915016448">February Schedule</a>
                        <a href="https://docs.google.com/spreadsheets/u/1/d/16JpF6vUksF3WYaULBEeYxvdsyCYSIsBhj9mR40D4Um4/edit?usp=drive_web&ouid=107885860769507234880">Printing Sheet</a>
                    </li>
               </ul>
            </li>
            <li key = "Links" className = "mobileVisible">
               <NavLink exact to = '/'>Links</NavLink>
               <ul className = "dropdown">
                   <li>
                        <NavLink exact to = '/providers/'>Providers</NavLink>
                        <NavLink exact to = '/providers/byBodyPart'>By Body Part</NavLink>
                        <NavLink exact to = "/messages/">Messages</NavLink>
                        <NavLink exact to = '/documentation/'>Documentation</NavLink>
                        <a href="https://docs.google.com/spreadsheets/d/1wSv8q3auvN6Z20-6vwZmiHyPXniwHPEErAV-ILPZyCc/edit#gid=1915016448">February Schedule</a>
                        <a href="https://docs.google.com/spreadsheets/u/1/d/16JpF6vUksF3WYaULBEeYxvdsyCYSIsBhj9mR40D4Um4/edit?usp=drive_web&ouid=107885860769507234880">Printing Sheet</a>
                    </li>
               </ul>
            </li>
            {showAuthForms()}
        </ul>
    </nav>
);
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
  }

const mapDispatchToProps = {
    logoutUser
}
  const ConnectedToolbar = connect(
    mapStateToProps, mapDispatchToProps
    )(toolbar)
  
  export default ConnectedToolbar