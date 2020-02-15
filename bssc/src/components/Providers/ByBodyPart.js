import React, {useState} from 'react'
import './ByBodyPart.css';
import { NavLink } from 'react-router-dom'

const ByBodyPart = () => {

    const [shownPart, setShownPart] = useState('all')

    

    const showAnkle = () => {
        return (
            <div className = "fullColumn subGrid">
            <div className = "gridItem keyColumn">Ankle [Achilles]</div>
                <ul>
                    <li>
                    <NavLink to = {`/provider/Slovenkai`}>Dr. Mark Slovenkai</NavLink> 
                    <NavLink to = {`/provider/Martinelli`}>PA Sheri Martinelli</NavLink>
                    <NavLink to = {`/provider/Hofmann`}>Dr. Kurt Hofmann</NavLink> 
                    <NavLink to = {`/provider/McKeon`}>Dr Brian McKeon (minor for his own pts)</NavLink> 
                    <NavLink to = {`/provider/Rand`}>PA Jason Rand (minor for his own pts)</NavLink> 
                    <NavLink to = {`/provider/Miller`}>Dr Suzanne Miller (minor for his own pts)</NavLink>
                    <NavLink to = {`/provider/Rice`}>PA Sarah Rice (minor for his own pts)</NavLink> 
                    <NavLink to = {`/provider/Weitzel`}>Dr Paul Weitzel (minor for his own pts)</NavLink> 
                    <NavLink to = {`/provider/Pacheco`}>PA Tom Pacheco (minor for his own pts)</NavLink>
                </li>
       
             
            </ul>
        </div>
        )
    }

    const showClavicle = () => {
        return (
            <div className = "fullColumn subGrid">
            <div className = "gridItem keyColumn">Clavicle (fx)</div>
                <ul>
                    <li>
                    <NavLink to = {`/provider/Weitzel`}>Dr Paul Weitzel</NavLink> 
                    <NavLink to = {`/provider/Pacheco`}>PA Tom Pacheco</NavLink>
                </li>
            </ul>
        </div>
        )
    }
    const showFoot = () => {
        return (
            <div className = "fullColumn subGrid">
            <div className = "gridItem keyColumn">Foot</div>
                <ul>
                    <li>
                    <NavLink to = {`/provider/Slovenkai`}>Dr. Mark Slovenkai</NavLink> 
                    <NavLink to = {`/provider/Martinelli`}>PA Sheri Martinelli</NavLink>
                    <NavLink to = {`/provider/Hofmann`}>Dr. Kurt Hofmann</NavLink> 
                </li>
            </ul>
        </div>
        )
    }
    
    const showElbow = () => {
        return (
            <div className = "fullColumn subGrid">
            <div className = "gridItem keyColumn">Elbow</div>
                <ul>
                    <li>
                    <NavLink to = {`/provider/Kimball`}>Dr Hervey Kimball</NavLink> 
                    <NavLink to = {`/provider/McKeon`}>Dr Brian McKeon (minor or distal biceps)</NavLink> 
                    <NavLink to = {`/provider/Rand`}>PA Jason Rand (minor or distal biceps)</NavLink> 
                    <NavLink to = {`/provider/Miller`}>Dr Suzanne Miller (minor for her est pts)</NavLink>
                    <NavLink to = {`/provider/Rice`}>PA Sarah Rice (minor for her est pts)</NavLink>
                    <NavLink to = {`/provider/Richmond`}>Dr John Richmond (minor for his own pts)</NavLink>
                    <NavLink to = {`/provider/Mithoefer`}>Dr Kai Mithoefer (minor)</NavLink>
 
                </li>
            </ul>
        </div>
        )
    }
    const showHip = () => {
        return (
            <div className = "fullColumn subGrid">
            <div className = "gridItem keyColumn">Hip</div>
                <ul>
                    <li>
                        <NavLink to = {`/provider/Wuerz`}>Dr. Thomas Wuerz</NavLink> 
                        <NavLink to = {`/provider/Wright`}>PA Stephen Wright</NavLink>
                        <NavLink to = {`/provider/Braziel`}>Dr. Andrew Braziel</NavLink> 
                        <NavLink to = {`/provider/Dolloff`}>PA Lauren Dolloff</NavLink>
                    </li>
            </ul>
        </div>
        )
    }
    const showKnee = () => {
        return (
            <div className = "fullColumn subGrid">
            <div className = "gridItem keyColumn">Knee</div>
                <ul>
                    <li>
                        <NavLink to = {`/provider/McKeon`}>Dr. Brian McKeon</NavLink> 
                        <NavLink to = {`/provider/Rand`}>PA Jason Rand</NavLink>
                        <NavLink to = {`/provider/Miller`}>Dr Suzanne Miller</NavLink>
                        <NavLink to = {`/provider/Rice`}>PA Sarah Rice</NavLink> 
                        <NavLink to = {`/provider/Wuerz`}>Dr. Thomas Wuerz</NavLink> 
                        <NavLink to = {`/provider/Wright`}>PA Stephen Wright</NavLink>
                        <NavLink to = {`/provider/Weitzel`}>Dr. Paul Weitzel</NavLink> 
                        <NavLink to = {`/provider/Pacheco`}>PA Tom Pacheco</NavLink>
                        <NavLink to = {`/provider/Richmond`}>Dr John Richmond </NavLink>

                        
                    </li>
            </ul>
        </div>
        )
    }
    const showShoulder = () => {
        return (
            <div className = "fullColumn subGrid">
            <div className = "gridItem keyColumn">Shoulder</div>
                <ul>
                    <li>
                        <NavLink to = {`/provider/Curtis`}>Dr. Alan Curtis</NavLink> 
                        <NavLink to = {`/provider/Ghobrial`}>PA Irene Ghobrial</NavLink>
                        <NavLink to = {`/provider/Miller`}>Dr. Suzanne Miller</NavLink>
                        <NavLink to = {`/provider/Jawa`}>Dr. Andrew Jawa</NavLink>
                        <NavLink to = {`/provider/Rice`}>PA Sarah Rice</NavLink> 
                        <NavLink to = {`/provider/McKeon`}>Dr. Brian McKeon</NavLink> 
                        <NavLink to = {`/provider/Rand`}>PA Jason Rand</NavLink>
                        <NavLink to = {`/provider/Wuerz`}>Dr. Thomas Wuerz</NavLink> 
                        <NavLink to = {`/provider/Wright`}>PA Stephen Wright</NavLink>
                        <NavLink to = {`/provider/Weitzel`}>Dr. Paul Weitzel</NavLink> 
                        <NavLink to = {`/provider/Pacheco`}>PA Tom Pacheco</NavLink>
                        <NavLink to = {`/provider/Richmond`}>Dr. John Richmond</NavLink>
                        <NavLink to = {`/provider/Kimball`}>Dr. Hervey Kimball</NavLink>  
                    </li>
            </ul>
        </div>
        )
    }
    const showHand = () => {
        return (
            <div className = "fullColumn subGrid">
            <div className = "gridItem keyColumn">Wrist/Hand</div>
                <ul>
                    <li>
                        <NavLink to = {`/provider/Kimball`}>Dr. Hervey Kimball</NavLink>  
                        <NavLink to = {`/provider/Terrono`}>Dr. Andrew Terrono</NavLink>
                        <NavLink to = {`/provider/Jawa`}>Dr. Andrew Jawa(est pt. that Dr. Jawa performed CTR/TF sx on)</NavLink>
                        <NavLink to = {`/provider/Rice`}>PA Sarah Rice(est pt. that Dr. Jawa performed CTR/TF sx on)</NavLink>  
                    </li>
            </ul>
        </div>
        )
    }
    return (
        <div className = "providerBodyPart">
            <h1>Provider By Body Part</h1>
            <div className = "selectBar">
                <select onChange = {({ target }) => setShownPart(target.value)}>
                    <option value ="all">All</option>
                    <option value ="ankle">Ankle/Achilles</option>
                    <option value ="foot">Foot</option>
                    <option value ="clavicle">Clavicle</option>
                    <option value ="elbow">Elbow</option>
                    <option value ="foot">Foot</option>
                    <option value ="hip">Hip</option>
                    <option value ="knee"> Knee</option>
                    <option value = "shoulder" >Shoulder</option>
                    <option value = "hand" >Hand</option>
                </select>
            </div>
            {(() => {
             switch (shownPart) {
                case 'all':
                    return (
                        <div className = "providerBodyPartGrid">
                            {showAnkle()}
                            {showClavicle()}
                            {showElbow()}
                            {showFoot()}
                            {showHip()}
                            {showKnee()}
                            {showShoulder()}
                            {showHand()}
                        </div>
                    );
                case 'ankle':
                    return (
                        <div className = "providerBodyPartGrid">
                            {showAnkle()}
                        </div>
                    );
                case 'clavicle':
                    return (
                        <div className = "providerBodyPartGrid">
                            {showClavicle()}
                        </div>
                    );
                case 'elbow':
                    return (
                        <div className = "providerBodyPartGrid">
                            {showElbow()}
                        </div>
                    );
                case 'foot':
                    return (
                        <div className = "providerBodyPartGrid">
                            {showFoot()}
                        </div>
                    );
                case 'hip':
                    return (
                        <div className = "providerBodyPartGrid">
                            {showHip()}
                        </div>
                    );
                case 'knee':
                    return (
                        <div className = "providerBodyPartGrid">
                            {showKnee()}
                        </div>
                    );
                case 'shoulder':
                    return (
                        <div className = "providerBodyPartGrid">
                            {showShoulder()}
                        </div>
                    );
                case 'hand':
                    return (
                        <div className = "providerBodyPartGrid">
                            {showHand()}
                        </div>
                    );
                default:
                    return null;
        }
      })()}
        </div>
    )

}

export default ByBodyPart