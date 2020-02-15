import React, { useState } from 'react'
import './Provider.css';
import providers from "../../data/providers.json"
import { connect } from 'react-redux'
import {pipe, pick, prop, toPairs } from 'ramda'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription, useApolloClient } from 'react-apollo'
import { setNotification } from '../../reducers/notificationReducer'

import AddProviderAlerts from './AddProviderAlerts'

const PROVIDER_ALERTS = gql`

  query providerAlerts($name: String!) {
    getAlerts(name : $name) {
      alerts
    }
  }

`

const REMOVE_ALERT = gql`
    mutation removeAlert($name: String!, $alert: String!){
    removeAlert(name: $name, alert: $alert) {
      name
      alerts
    }
  }
`


const ALERT_ADDED = gql`
  subscription alertAdded($provider: String!) {
      alertAdded(provider: $provider) {
          alert
          provider
      }
  }
`


const ALERT_REMOVED = gql`
  subscription{
      alertRemoved
  }
`

 const Provider = ({ chosenProvider, user, setNotification }) => {

    const [patientId, setPatientId] = useState('30823')
    const [providerAlerts, setProviderAlerts] = useState(null)

    const submitPatientId = (event) => {
        event.preventDefault()
        const ptID = event.target.patientId.value
        setPatientId(ptID)
        event.target.patientId.value = ''
    }

    const client = useApolloClient()

    const oneProviderAlerts = useQuery(PROVIDER_ALERTS, {
        variables: {name: chosenProvider.name},
        notifyOnNetworkStatusChange: true
      })
      
    // const { loading, error, data } = useQuery(PROVIDER_ALERTS, {
    //         variables: {name: providerFullName}
    //       })

    const findLinkInsert = (form, type) => {
        const link = form
        if (type === "link") {
            const insertedLink = link.replace("PATIENTID=", `PATIENTID=${patientId}`)
            return insertedLink
        } else {
            return require(`../../_forms/${form}`)
        }

    }

    
    const getProvider = pipe(
        prop(chosenProvider.key)
    )
    
    const currentProvider = (getProvider(providers))
    
    const unmapBooking = pipe(
        prop('booking'),
        toPairs(),
    )
    const unmapNewPatientChart = pipe(
        prop('printing'),
        pick(['New Patient']),
        prop('New Patient'),
        prop('Chart'),
        toPairs()
        // props(["Chart"]),
        // toPairs()
        // pick(["Chart", "Fill Out"])
    )
    const unmapNewPatientFillOut = pipe(
        prop('printing'),
        pick(['New Patient']),
        prop('New Patient'),
        prop('Fill Out'),
        toPairs()
        // props(["Chart"]),
        // toPairs()
        // pick(["Chart", "Fill Out"])
    )
    const unmapEstPatientChart = pipe(
        prop('printing'),
        pick(['Established Patient']),
        prop('Established Patient'),
        prop('Chart'),
        toPairs()
        // props(["Chart"]),
        // toPairs()
        // pick(["Chart", "Fill Out"])
    )
    const unmapEstPatientFillOut = pipe(
        prop('printing'),
        pick(['Established Patient']),
        prop('Established Patient'),
        prop('Fill Out'),
        toPairs()
        // props(["Chart"]),
        // toPairs()
        // pick(["Chart", "Fill Out"])
    )
    // const unmapProviderInfo = pipe(

    // )

    // const providerInfo = (unmapProviderInfo(currentProvider))
            
    const handleError = (error) => {
        setNotification(error.graphQLErrors[0].message, 10)
      }

    const providerBooking = (unmapBooking(currentProvider))
    const providerNewPatientChart = (unmapNewPatientChart(currentProvider))
    const providerNewPatientFillOut = (unmapNewPatientFillOut(currentProvider))

    const providerEstPatientChart = (unmapEstPatientChart(currentProvider))
    const providerEstPatientFillOut = (unmapEstPatientFillOut(currentProvider)) 
    
    const [view, setView] = useState("provider")


    const updateCacheWith = (alert, type) => {
        
        const dataInStore = client.readQuery({ query: PROVIDER_ALERTS,
            variables: {name: chosenProvider.name}
        })

        if(type.action === "add") {  
            console.log(oneProviderAlerts)
            if (!(dataInStore.getAlerts.alerts.includes(alert.alert))){
                console.log("data before add")
                console.log(dataInStore.getAlerts.alerts)
                dataInStore.getAlerts.alerts.push(alert.alert)

                client.writeQuery({
                    query: PROVIDER_ALERTS,
                    variables: {name: chosenProvider.name},
                    // data: dataInStore
                    data: dataInStore
                        })
                    }
                console.log("data after add")
                const newData = client.readQuery({ query: PROVIDER_ALERTS,
                    variables: {name: chosenProvider.name}
                })
                console.log(newData.getAlerts.alerts)
                oneProviderAlerts.refetch()
            }
        if (type.action === "remove") {
            if ((dataInStore.getAlerts.alerts.includes(alert))){
                console.log("data before remove")
                console.log(dataInStore.getAlerts.alerts)

               const alertsWithAlertRemoved = dataInStore.getAlerts.alerts.filter(a => a !== alert)
               dataInStore.getAlerts.alerts = alertsWithAlertRemoved
                client.writeQuery({
                    query: PROVIDER_ALERTS,
                    variables: {name: chosenProvider.name},

                            data: dataInStore
                        })
                    }
                    console.log("data after remove")
                    const newData = client.readQuery({ query: PROVIDER_ALERTS,
                        variables: {name: chosenProvider.name}
                    })
                    console.log(newData.getAlerts.alerts) 
                    oneProviderAlerts.refetch()
      
                 }
    }


    useSubscription(
        ALERT_ADDED,
        {
        variables: {provider: chosenProvider.name},
        onSubscriptionData: ({subscriptionData}) => {
            const addedAlert = subscriptionData.data.alertAdded
            updateCacheWith(addedAlert, {action: "add"})
        }
    }
)
    useSubscription(ALERT_REMOVED, {
        onSubscriptionData:({ subscriptionData }) => {
            const removedAlert = subscriptionData.data.alertRemoved
            updateCacheWith(removedAlert, {action: "remove"})
        }
    })

      
    const [removeAlert] = useMutation(REMOVE_ALERT, {
    onError: handleError
    })
    
    const removeAlertOnClick = async (alert) => {
        const removed = await removeAlert({
            variables: {
                name: currentProvider.name,
                alert: alert
            }
        })

        return removed
    }

    const showLinkedProvider = () => {
        if (currentProvider.linkedProvider.length === 1) {
        return (
            <div className = "fullColumn gridItem titleColumn">
                {currentProvider.title} for {currentProvider.linkedProvider[0]}
            </div>
        )
    } else if (currentProvider.linkedProvider.length === 0) {
        return null
    } else {
        return (
            currentProvider.linkedProvider.map(lp => 
                <div key = {lp} className = "fullColumn gridItem titleColumn">
                    {currentProvider.title} for {lp}
                </div>
            )
        )
    }

    }

    const showAlerts = () => {
        if (oneProviderAlerts.loading || (oneProviderAlerts.data === undefined)) {
            return null
        }
        return (
        <ul>
            {
            oneProviderAlerts.data.getAlerts.alerts.map(a =>
            <li key = {a}>
                {a} 
                {( ((user.permissions.includes('admin')) || (user.permissions.includes(currentProvider.name)) ? 
                    <button className = "removeButton" onClick = {() => removeAlertOnClick(a)}>Remove Alert</button>
                    :
                    null
                ))}
            </li>)}
            {currentProvider.alerts.map(a =>
                <li key = {a}>{a}</li>)}
            </ul>
        )
    }

    const showTab = () => {
        if (view === "provider") {
            return (
            <div className = "provider">
                <img src = {require(`../../images/${currentProvider.name}.jpg`)} alt = {currentProvider.name}/>
            
            <div className = "printingSheet">
                {showLinkedProvider()}
                <div className = "fullColumn subGrid">
                    <div className = "gridItem keyColumn">NPI</div>
                    <ul>
                {currentProvider.npi.map(n =>
                    <li key = {n}>
                        {n}
                    </li>
                        )}
                    </ul>
                </div>
                <div className = "fullColumn subGrid">
                <div className = "gridItem keyColumn">
                    Coordinator
                </div>
                <ul>
                {
                    currentProvider.coordinator.map(c => 
                        <li key = {c.name}>
                            {c.name}, ext. {c.extension}
                        </li>)
                }
                </ul>
                </div>
                <div className = "fullColumn subGrid">
                    <div className = "gridItem keyColumn">
                        Schedule
                    </div>
                    <ul>
                    {currentProvider.schedule.map(d => 
                        <li key = {d}>
                            {d}
                        </li>
                         )}
                    </ul>
                </div>
            </div>
            </div>
            )
        }
        else if (view === "booking") {
            return (
                // <div className = "provider">
                //     {ireneShow.booking.guidelines.map(g =>
                //         <div className = "fullRow blueStripe" key = {g}>
                //             {g}
                //         </div>)}
                //     <div className = "fullRow whiteStripe">
                //         Post Op: {ireneShow.booking.postOp}
                //     </div>
                //     {ireneShow.booking.specialties.map(s =>
                //         <div className = "fullRow blueStripe" key = {s}>
                //             {s}
                //         </div>)}
                // </div>

                <div className = "printingSheet">
                    {
                    providerBooking.map(i =>
                    <div key = {i} className = "fullColumn subGrid">
                        <div className = "gridItem keyColumn" key = {i[0]}>
                            {i[0]}
                        </div>
                        <ul>
                            {i[1].map(j =>
                                <li key = {j}>
                                    {j}
                                </li>
                                )}
                        </ul>
                    </div>
                        )
                        
                        }

                </div>
            )
            }
        else if (view === "forms") {
            return (
                <div className = "IDsheet">
                    <div className = "patientIdContainer">
                        <form onSubmit={submitPatientId} className = "inputBar" >
                            <div className = "patientIdForm">
                            patient ID <input
                                name = "patientId"
                            />
                                <button type='submit'>input patient</button>
                            </div>
                        </form>
                        <div className = "currentlyPrinting">
                                Currently printing for patient ID: #{patientId}
                            </div>
                    </div>
                    <div className = "printingSheet">
                        <div className = "fullColumn subGrid">
                            <div className = "gridItem keyColumn">
                                {currentProvider.name}
                            </div>
                            <ul>
                                {currentProvider.forms.map(f =>
                                <li key = {f[0]}>
                                    <a 
                                        target = "_blank" 
                                        href = {findLinkInsert((f[1]), f[2])}>{f[0]}</a>
                                </li>
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>

            )
            }
        else if (view === "printing") {
            return (
                <div className = "printingSheet">
                    <div className = "fullColumn gridItem titleColumn" 
                        style = {{
                            marginTop: '20px',
                            height: '100px',
                            fontSize: '28px'
                        }}
                    >
                        {currentProvider.printing.SheetType}
                    </div>
                    <div className = "gridItem keyColumn">
                        Xrays
                    </div>
                    <ul>
                        {currentProvider.printing.XRays.map(x =>
                            
                                <li key = {x}>{x}</li>
                            )}
                        </ul>
                    <div className = "fullColumn gridItem titleColumn">
                        New Patients
                    </div>
                    <div className = "fullColumn gridItem titleColumn">
                        Chart
                    </div>

                    {
                        
                        providerNewPatientChart.map(i => 
                        <div key = {i} className = "fullColumn subGrid">
                            <div key = {i[0]} className = "gridItem keyColumn">
                                {i[0]}
                            </div>
                            <ul>
                                {i[1].map(j =>
                                    <li key = {j}>
                                        {j}
                                    </li>
                                    )}
                            </ul>
                        </div>
                            )
                
                    }
                    
                    <div className = "fullColumn gridItem titleColumn">
                        Fill Out
                    </div>
                    {
                        
                        providerNewPatientFillOut.map(i => 
                        <div key = {i} className = "fullColumn subGrid">
                            <div key = {i[0]} className = "gridItem keyColumn">
                                {i[0]}
                            </div>
                            <ul>
                                {i[1].map(j =>
                                    <li key = {j}>
                                        {j}
                                    </li>
                                    )}
                            </ul>
                        </div>
                            )
                
                    }

                    <div className = "fullColumn gridItem titleColumn">
                        Established Patients
                    </div>
                    <div className = "fullColumn gridItem titleColumn">
                        Chart
                    </div>
                    {
                                            
                        providerEstPatientChart.map(i => 
                        <div key = {i} className = "fullColumn subGrid">
                            <div key = {i[0]} className = "gridItem keyColumn" >
                                {i[0]}
                            </div>
                            <ul>
                                {i[1].map(j =>
                                    <li key = {j}>
                                        {j}
                                    </li>
                                    )}
                            </ul>
                        </div>
                            )
                
                    }

                    <div className = "fullColumn gridItem titleColumn">
                        Fill Out
                    </div>
                    {
                        
                        providerEstPatientFillOut.map(i => 
                        <div key = {i} className = "fullColumn subGrid">
                            <div key = {i[0]} className = "gridItem keyColumn" >
                                {i[0]}
                            </div>
                            <ul>
                                {i[1].map(j =>
                                    <li key = {j}>
                                        {j}
                                    </li>
                                    )}
                            </ul>
                        </div>
                            )
                
                    }
            </div>
            )
    }

    }

     return (
     
            <div className = "provider" id = "Top">
            <div className = "title blueStripe">
                {currentProvider.name}, {currentProvider.title}
                </div>
                
                <div className = "fullRow redStripe" style = {{ marginTop: '20px' }}>
                    Alerts
               </div>
               <div className = "fullRow redStripe" style = {{ marginBottom: '20px' }}>
                    {/* <ul>
                    {((oneProviderAlerts.loading) || (oneProviderAlerts.data === undefined)) ? null :
                    oneProviderAlerts.data.getAlerts.alerts.map(a =>
                    <li key = {a}>
                        {a} 
                        {( ((user.permissions.includes('admin')) || (user.permissions.includes(currentProvider.name)) ? 
                            <button className = "removeButton" onClick = {() => removeAlertOnClick(a)}>Remove Alert</button>
                            :
                            null
                        ))}
                    </li>)}
                    {currentProvider.alerts.map(a =>
                        <li key = {a}>{a}</li>)}
                    </ul> */}
                    {showAlerts()}
                </div>
                <AddProviderAlerts name = {currentProvider.name}  />
                <div className = "provider-tabs whiteStripe">
                    <div className = {"provider-tab " + (view === "provider" ? "current-tab" : null)} onClick = {() => setView("provider")}>Provider</div>
                    <div className = {"provider-tab " + (view === "booking" ? "current-tab" : null)} onClick = {() => setView("booking")}>Booking</div>
                    <div className = {"provider-tab " + (view === "printing" ? "current-tab" : null)} onClick = {() => setView("printing")}>Printing</div>
                    <div className = {"provider-tab " + (view === "forms" ? "current-tab" : null)} onClick = {() => setView("forms")}>Print Forms</div>
                </div>
                {showTab()}
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

const ConnectedProvider = connect(
    mapStateToProps, mapDispatchToProps
)(Provider)

 export default ConnectedProvider