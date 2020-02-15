import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Providers.css';

const Providers = ({ providersList }) => {

    return (
        <div className = "picContainer">
            
            <div className = "providersGrid">
            {providersList.map(p =>
                <NavLink to = {`/provider/${p.key}`} key = {p.key}>
                    <div className = "providerPicContainer">
                        <img className = "providerImage" src = {require(`../../images/${p.name}.jpg`)} alt = {p.name}/>
                        <div className = "providerName">{p.name}</div>
                    </div>
                </NavLink>
                )}
                
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        providersList: state.providers
    }
}

const ConnectedProviders = connect(
    mapStateToProps
    )(Providers)

export default ConnectedProviders