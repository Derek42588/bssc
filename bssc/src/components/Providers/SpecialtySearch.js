import React, {useState, useEffect} from 'react'
import './SpecialtySearch.css';

import providers from "../../data/providers.json"
import {pipe, pick, prop, toPairs } from 'ramda'


const SpecialtySearch = () => {
    const providerToPairs = pipe(
        toPairs(),
    )
    const testy = providerToPairs(providers)
    
    const filteredSpecialties = testy.map(a => {
        if (a[0] === "Rice") {
            return {
                name: a[1].name,
                specialties: a[1].booking["Jawa Specialties"].concat(a[1].booking["Miller Specialties"]) 
            }
        } else {
            return {
                name: a[1].name,
                specialties: a[1].booking.Specialties
            }
        }
})

    useEffect(() => {
        console.log(testy)
        console.log(filteredSpecialties)
    },[])
    return (
        <div>

        </div>
    )
}

export default SpecialtySearch