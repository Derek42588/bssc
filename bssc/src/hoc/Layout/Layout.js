import React from 'react';
import AuxCont from '../Aux Container/AuxCont';
import './Layout.css';
import Toolbar from '../../components/Toolbar/Toolbar';

const Layout = (props) => {


        return (
            <AuxCont>
        {/* higher order component as a wrapper */}
                <Toolbar logout = {props.logout}/>  
                <main className="Content">
                    {props.children}
                </main>
            </AuxCont>
        )
}



export default Layout;