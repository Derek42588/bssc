import React, {useState} from 'react'
import './Documentation.css';

const docs = [
    {
        title: "Insurances",
        link: "#Insurances",
        keys: "Insurance Cheat Sheet MassHealth Tufts Medicare HPHC BCBS Referrals"
    },
    {
        title: "Our Numbers",
        link: "#Our Numbers",
        keys: "Phone Numbers Our Address"
    },
    {
        title: "Outside Phone Numbers",
        link: "#phones",
        keys: "Phone Numbers Outside"
    },
    {
        title: "Outside Referrals",
        link: "#outsideReferrals",
        keys: "Referrals Outside"
    },
    {
        title: "Acupuncture",
        link: "#Acupuncture",
        keys: "Acupuncture Self-Pay Self Pay"
    },
    {
        title: "Referrals",
        link: "#Referrals",
        keys: "Referrals Waiver Deposit NPI Network"
    },
    {
        title: "MVA",
        link: "#MVA",
        keys: "MVA Motor Vehicle Accident PIP personal insurance protection injury car"
    },
    {
        title: "Visco Billing",
        link: "#Visco Billing",
        keys: "Visco VSCO Viscosupplementation Hyaluronic Acid Billing Referral Hyalgan Monovisc Synvisc Orthovisc Euflexxa GelOne Durolane"
    },
    {
        title: "Self Pay",
        link: "#Self Pay",
        keys: "Self Pay Square Reader Visit Price Cortisone Xiaflex VSCO Visco Viscosupplementation"
    },
    {
        title: "NEBH Specialty Practice",
        link: "#NEBH Specialty Practice",
        keys: "Specialty Practice Program NEBH"
    },
    {
        title: "Add Insurance",
        link: "#Add Insurance",
        keys: "Insurance Add Eligibility"
    },
    {
        title: "Patient Balance",
        link: "#Patient Balance",
        keys: "Balance Billing"
    },
    {
        title: "MA Workflow for SOS",
        link: "#MA Workflow for SOS",
        keys: "MA Workflow SOS Surgery"
    },
    {
        title: "Visco and Zilretta Injections",
        link: "#Visco and Zilretta Injections",
        keys: "Visco VSCO Zilretta Hyaluronic Acid Euflexxa Orthovisc Synvisc Monovisc GelOne Durolane Hyalgan Authorization Supply"
    },
    {
        title: "Worker's Comp",
        link: "#Worker's Comp",
        keys: "WC Workers Worker Comp Compensation Travellers Stacy Andrew"
    },
    {
        title: "Xrays",
        link: "#Xrays",
        keys: "XR XRay Hours Schedule"
    }
]

const Documentation = () => {
    const [filter, setFilter] = useState('')
    const [getDocs, setGetDocs] = useState(docs)
    const lowercaseFilter = filter.toLowerCase()

    const filteredDocs = getDocs.filter(item => {
        return Object.keys(item).some(key => 
            item[key].toLowerCase().includes(lowercaseFilter))
    })

    const handleFilterChange = event => {
        setFilter(event.target.value)
    }
    return (
        <div className = "documentation" id = "Search">
            <div className = "documentCard">
                <div className = "titleBanner">
                    <h1>Search For Documentation</h1>
                </div>
                <div className = "searchBox">
                    Search Topic:
                    <input type = "text" className = "searchBar" value = {filter} onChange = {handleFilterChange} />
                    <div className = "searchItems">
                    {filteredDocs.map(item => (
                        <a className = "searchItem" key = {item.title} href = {item.link}>
                            {item.title}
                        </a>
                    ))}
                    </div>
                </div>
            </div>
            <div className = "documentCard" id = "Insurances">
            <div className = "titleBanner">
                    <h1>Insurances</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <div className = "insurancesBoxRow titleRow">
                        WE DO NOT ACCEPT
                    </div>
                    <ul className = "insurancesBoxRow">
                        <li>3rd Party Billing</li>
                        <li>Auto Insurance - need an exhausted PIP letter</li>
                        <li>Beech Street</li>
                        <li>Boston Medical Center (BMC) Healthnet</li>
                        <li>Health Safety Net</li>
                        <li>HPHC Elevate</li>
                        <li>Celtic Care</li>
                        <li>Commonwealth Care</li>
                        <li>Out of State Medicaid (meaning not MASShealth)</li>
                        <li>Senior Whole Health (Medicaid Replacement)</li>
                        <li>Fallon Direct* (needs out of network auth)</li>
                        <li>Fallon Medicaid Wellforce ACO</li>
                        <li>First Health</li>
                        <li>Health New England</li>
                    </ul>
                </div>
                <div className = "insurancesBox">
                    <div className = "insurancesBoxRow titleRow">
                        MASSHEALTH | INTERNATIONAL | TRAVEL
                    </div>
                    <div className = "insurancesBoxRow">
                        <ul>
                            <li>
                            MASSHEALTH is accepted by Drs Jawa, Weurz, Slovenkai, Terrono and Kimball
                            </li>
                            <li>
                            All questions of travel/international insurances must be sent to billing, do not book!
                            </li>
                        </ul>
                    </div>
                </div>
                <div className = "insurancesBox">
                    <div style = {{textAlign: "left", padding: "10px", border: "1px solid #2486e2", fontWeight: "bold"}}>The following page contains a cheat sheet of insurance plans.  Please remember that this is not a guarantee.  Most insurance will fall into the categories outlined; however, there will still be exceptions.  Please use the table as a guideline</div>

                    <div style = {{padding: "10px", border: "1px solid #2486e2", width: "100%"}}>Please use the following tips to ensure that the correct package is selected:
                        <ul>
                            <li>
                                Search by PO Box on card
                            </li>
                            <li>
                                Search by phone number on card
                            </li>
                        </ul>
                    </div>
                    <div style = {{padding: "10px", border: "1px solid #2486e2", width: "100%"}}>Properly inform patient of their responsibilities:
                        <ul>
                            <li>Referral</li>
                            <li>Referral policy</li>
                        </ul>
                    </div>
                </div>
                <div className = "insurancesGrid">
                    <div className = "insurancesGridTitleText">Insurance</div>
                    <div className = "insurancesGridTitleText">Ref?</div>
                    <div className = "insurancesGridTitleText">Notes</div>
                    <div className = "insurancesGridFullRow insurancesGridTitleText">BCBS/MA</div>
                    <div>PPO</div>
                    <div>No</div>
                    <div className ="bcbsNotes">
                        <ul>
                            <li>
                                Plans will almost always begin with 3 letters followed by 9 numbers
                            </li>
                            <li>
                                XXP is a PPO
                            </li>
                            <li>
                                XXH or MTN is an HMO
                            </li>
                            <li>
                                Federal begins w/ R, Medex begins w/ XXM and XXG
                            </li>
                            <li>
                                Medex is never primary - always secondary to Medicare
                            </li>
                            <li>
                                Blue Access HMO - XXF, EHJ = no ref
                            </li>
                        </ul>
                    </div>
                    <div>POS</div>
                    <div>Yes</div>
                    <div>HMO</div>
                    <div>Yes</div>
                    <div>Federal</div>
                    <div>No</div>
                    <div>Medex</div>
                    <div>No</div>
                    <div>Blue Access</div>
                    <div>No</div>
                    <div>BCBS Out of State</div>
                    <div>May require cross border</div>
                    <div>
                        <ul>
                            <li>If any state other than MA - Do not choose the plan's individual state</li>
                            <li>Phrases such as Anthem, Highmark, Horizon, Empire indicate an out of state policy</li>
                        </ul>
                    </div>
                    <div className = "insurancesGridFullRow insurancesGridTitleText">Harvard Pilgrim</div>
                    <div>PPO</div>
                    <div>No</div>
                    <div>Starts as "HHP"</div>
                    <div>HMO</div>
                    <div>Yes</div>
                    <div>
                        <ul>
                            <li>Starts as "HP"</li>
                            <li>PCP must match on the day of the appointment in order to backdate any referral</li>
                        </ul>
                    </div>
                    <div>POS</div>
                    <div>Yes</div>
                    <div>Starts as "HPS"</div>
                    <div className = "insurancesGridFullRow insurancesGridTitleText">Tufts</div>
                    <div>HMO, EPO</div>
                    <div>Yes</div>
                    <div></div>
                    <div>Network</div>
                    <div>Yes</div>
                    <div>First letter is N. Also take Tufts Direct, Tufts Together</div>
                    <div>Navigator/PPO</div>
                    <div>No</div>
                    <div></div>
                    <div>POS</div>
                    <div>Yes</div>
                    <div></div>
                    <div className = "insurancesGridFullRow insurancesGridTitleText">Others</div>
                    <div>Cigna Open Access Plus</div>
                    <div>No</div>
                    <div>
                        <ul>
                            <li>Always begins with "U"</li>
                            <li>Always be sure to clarify whether it states "Tufts Carelink" or not</li>
                        </ul>
                    </div>
                    <div>GIC/Unicare</div>
                    <div>No</div>
                    <div></div>
                    <div>Fallon Select HMO</div>
                    <div>Yes</div>
                    <div></div>
                    <div>Health Plans Inc.</div>
                    <div>No</div>
                    <div>Need group number</div>
                    <div>Health NE</div>
                    <div></div>
                    <div>Needs out of network auth</div>
                    <div>MassHealth | Medicaid</div>
                    <div>Yes</div>
                    <div>
                        <ul>
                            <li>Never primary if there is another insurance, but can be the only insurance</li>
                            <li>If secondary and pt is booked with a provider who does not accept, we will not bill and pt is responsible</li>
                            <li>Register patient, speak to billing to verify it is a product we accept</li>
                        </ul>
                    </div>
                    <div>Medicare</div>
                    <div>No</div>
                    <div>Usually primary, can be secondary.  Demographics must match quickview.</div>
                    <div>United HC</div>
                    <div>No</div>
                    <div>Need Group #, always numerical - no letters</div>
                    <div>Unicare</div>
                    <div>No</div>
                    <div></div>
                </div>
            </div>
            <div className = "documentCard" id = "Our Numbers">
                <div className = "titleBanner">
                    <h1>Our Addresses and Phone Numbers</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul>
                        <li style = {{fontWeight: "bold", fontSize: "20px"}}>
                            Dedham: New England Baptist Outpatient Care Center
                        </li>
                        <li>
                            40 Allied Drive, Dedham, MA 02027
                        </li>
                        <li>
                            Ph: 617-264-1100 Fax: 617-264-1101
                        </li>
                    </ul>
                    <ul>
                        <li style = {{fontWeight: "bold", fontSize: "20px"}}>
                            Waltham
                        </li>
                        <li>
                            840 Winter Street, Waltham MA 02451
                        </li>
                        <li>
                            Ph: 781-890-2133 Fax: 781-890-2177
                        </li>
                    </ul>
                    <ul>
                        <li style = {{fontWeight: "bold", fontSize: "20px"}}>
                            Bourne: Physicians of New England Baptist Hospital at Cape Cod
                        </li>
                        <li>
                            123 Waterhouse Road, Bourne, MA 02532
                        </li>
                    </ul>
                    <ul>
                        <li style = {{fontWeight: "bold", fontSize: "20px"}}>
                            Boston: New England Baptist Hospital
                        </li>
                        <li>
                            125 Parker Hill Avenue, Boston, MA, 02120
                        </li>
                        <li>
                            Fremont-Smith Building Floor 5 - Dr. Braziel
                        </li>
                        <li>
                            Converse Building Floor 7 - All Others
                        </li>
                    </ul>
                    <ul>
                        <li style = {{fontWeight: "bold", fontSize: "20px"}}>
                            Braintree: HealthSouth Braintree Rehab Hospital
                        </li>
                        <li>
                            250 Pond Street, Braintree, MA 02184
                        </li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "phones">
                <div className = "titleBanner">
                    <h1>Outside Phone Numbers</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "outsidePhonesGrid">
                    <div>NEBH IT Help Desk</div>
                    <div>617-754-5300</div>
                    <div>NEBH Main</div>
                    <div>617-754-5800</div>
                    <div>NEBH OR</div>
                    <div>617-754-5100</div>
                    <div>NEBH Prescreening</div>
                    <div>617-754-5495</div>
                    <div>NEBH Imaging Preregistration</div>
                    <div>617-754-6000</div>
                    <div>NEBH Radiology</div>
                    <div>617-754-5287</div>
                    <div>NEBH Imaging Copies</div>
                    <div>617-754-5289</div>
                    <div>NEBH Referral Line</div>
                    <div>800-370-6325</div>
                    <div>NEBH Lab</div>
                    <div>617-754-5200</div>
                    <div>New England Pain Management</div>
                    <div>877-651-7246</div>
                    <div>BOSS</div>
                    <div>781-895-4901</div>
                    <div>SHIELDS</div>
                    <div>800-258-4674</div>
                    <div>Pro Sports Physical Therapy</div>
                    <div>781-487-9944</div>
                    <div>DMI (Collections)</div>
                    <div>508-533-1900</div>
                    <div>First Financial</div>
                    <div>800-747-2302</div>
                    <div>Surgicare</div>
                    <div>800-797-8744</div>
                    <div>Ferraro and Forbes</div>
                    <div>781-740-1788</div>
                </div>
            </div>
            <div className = "documentCard" id = "outsideReferrals">
                <div className = "titleBanner">
                    <h1>Outside Referrals</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <div  style = {{fontWeight: "bold", fontSize: "40px"}}>
                            Mass General Hospital</div>
                    <ul className = "referralBox">
                        <li style = {{fontWeight: "bold", fontSize: "18px"}}>
                            Dr. Christopher W DiGiovanni
                        </li>
                        <li>
                            Mass General/Newton Wellesley Foot and Ankle Center
                        </li>
                        <li>
                            40 Second Ave
                            Bldg 52 Suite 1150
                        </li>
                        <li>
                            Waltham, MA 02451
                        </li>
                        <li>
                            Phone: 617-724-9338
                        </li>
                        <li>
                            Fax: 781-487-4003
                        </li>
                    </ul>
                    <ul className = "referralBox">
                        <li style = {{fontWeight: "bold", fontSize: "18px"}}>
                            Orthopedic Associates
                        </li>
                        <li>
                            55 Fruit Street
                        </li>
                        <li>
                            Yawkey Center for Outpatient Care, Suite 3F
                        </li>
                        <li>
                            Boston, MA 02114-2696
                        </li>
                        <li>
                            Phone: 617-724-9338
                        </li>
                        <li>
                        Fax: 781-487-4003
                        </li>
                    </ul>
                    <ul className = "referralBox">
                        <li style = {{fontWeight: "bold", fontSize: "18px"}}>
                            Dr George H Theodore
                        </li>
                        <li>
                            MGH Sports Medicine Center
                        </li>
                        <li>
                            175 Cambridge St, 4th Floor
                        </li>
                        <li>
                            Boston, MA 02114-2723
                        </li>
                        <li>
                            Phone: 617-724-7009
                        </li>
                        <li>
                        Fax: 617-643-1006
                        </li>
                    </ul>
                    <div  style = {{fontWeight: "bold", fontSize: "40px"}}>
                            Beth Israel Deaconess Medical Center</div>
                    <ul className = "referralBox">
                        <li style = {{fontWeight: "bold", fontSize: "18px"}}>
                            Dr. Christopher P. Miller and Dr. John Y. Kwon
                        </li>
                        <li>
                            Carl J. Shapiro Dept. of Orthopedics
                        </li>
                        <li>
                            330 Brookline Avenue
                        </li>
                        <li>
                            Boston, MA 02115
                        </li>
                        <li>
                            Phone: 617-667-3940
                        </li>
                        <li>
                            Office Locations: Boston, Needham, Chesnut Hill
                        </li>
                    </ul>
                    <div  style = {{fontWeight: "bold", fontSize: "40px"}}>
                            Brigham and Women's Hospital</div>
                    <ul className = "referralBox">
                        <li style = {{fontWeight: "bold", fontSize: "18px"}}>
                            Dr. Christopher Chiodo
                        </li>
                        <li>
                            Brigham and Women's Orthopedic Center, Foot and Ankle Center
                        </li>
                        <li>
                            Brigham and Women's Faulkner Hospital
                        </li>
                        <li>
                            1153 Centre Street, Suite 5 South
                        </li>
                        <li>
                            Boston, MA 02130
                        </li>
                        <li>
                            Phone: 617-983-7363
                        </li>
                        <li>
                            Fax: 617-983-4751
                        </li>
                    </ul>
                    <ul className = "referralBox">
                        <li style = {{fontWeight: "bold", fontSize: "18px"}}>
                            Brigham and Women's/Mass General Health Care Center at Foxboro
                        </li>
                        <li>
                            20 Patriot Place
                        </li>
                        <li>
                            Foxboro, MA 02035
                        </li>
                        <li>
                            Phone: 617-983-7363
                        </li>
                    </ul>
                    <ul className = "referralBox">
                        <li style = {{fontWeight: "bold", fontSize: "18px"}}>
                            Brigham and Women's Hospital, Dept. of Orthopedic Surgery
                        </li>
                        <li>
                            75 Francis Street
                        </li>
                        <li>
                            Boston, MA 02115
                        </li>
                        <li>
                            Phone: 617-983-7363
                        </li>
                        <li>
                            Fax: 617-983-4751
                        </li>
                    </ul>
                    <div  style = {{fontWeight: "bold", fontSize: "40px"}}>
                            Urgent or Other</div>
                    <ul className = "referralBox">
                        <li style = {{fontWeight: "bold", fontSize: "18px"}}>
                            Orthopedic Trauma Center
                        </li>
                        <li>
                            55 Fruit Street
                        </li>
                        <li>
                            Yawkey Building, Suite 3C
                        </li>
                        <li>
                            Boston, MA 02114
                        </li>
                        <li>
                            Phone: 617-726-9111
                        </li>
                        <li>
                            Fax: 617-726-8214
                        </li>
                    </ul>
                    <div  style = {{fontWeight: "bold", fontSize: "40px"}}>
                            Out of State Referrals</div>
                    <ul className = "referralBox">
                        <li style = {{fontWeight: "bold", fontSize: "18px"}}>
                            AOFAS.org - find a member
                        </li>
                       
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "Acupuncture">
                <div className = "titleBanner">
                    <h1>Acupuncture</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <h3>HPHC</h3>
                    <ul className = "infoBox">
                        <li>
                            Okay to bill
                        </li>
                        <li>
                            Referral/Auth not required
                        </li>
                        <li>
                            HPHC allows 20 visits per calendar year
                        </li>
                        <li>
                            After 20 visits, pt must self pay
                        </li>
                        <li>
                            Send case to billing after scheduling appointment so they can verify if pt has acupuncture benefits or not (pt will be notified before their appt if they do not have benefits and must self pay)
                        </li>
                        <li>
                            Billing will add dummy referral in Athena to help count remaining visits before pt becomes self-pay
                        </li>
                        <li>
                            Billing will do benefit check for all HPHC pts to confirm number remaining and copay
                        </li>
                    </ul>
                    <h3>Self-Pay</h3>
                    <ul className = "infoBox">
                        <li>Initial Visit = $150</li>
                        <li>Follow visit = $90</li>
                        <li>Bundle deal: 10 visits including initial eval is $864, 10 f/u visits is $810</li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "Referrals">
                <div className = "titleBanner">
                    <h1>Referrals</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul className = "infoBox">
                        <li>Patients must be told to obtain their own referral at the time of scheduling appointments.  Provide patient with doctor's NPI #, address of appointment, and our fax number</li>
                        <li>All referrals must be issued to the doctor not the physician assistant</li>
                        <li>When Sarah is treating a Jawa patient, a referral should be issued to Jawa.</li>
                        <li>When Sarah is treating a Miller patient, a referral should be issued to Miller.</li>
                        <li>HMO plans require referrals. If patients do not have referral by the time of appointment they will have to sign the BSSC referral waiver and pay a $150 referral deposit. Health insurances will not pay if there is no referral on file. Patient will be fully responsible for all charges. A bill will be mailed to patient for any amount above the referral deposit</li>
                        <li>POS plans do not require referrals but if a referral is on file it will lower the out of pocket cost for the patient. These plans has in and out-of-network benefits. If a patient has a referral on file, their claims will be processed with in-network at a lower cost (i.e. lower copay $30 vs $45, lower deductible $500 vs $2500). If a patient doesn’t have a referral, their claims will be processed with them having a higher out-of-pocket cost (i.e. higher copay $45 vs $30, higher deductible $2500 vs. $500). Patients do not need to sign referral waiver, they do not need to pay referral deposit.</li>
                        <li>PPO plans do not require referrals</li>
                    </ul>
                    <h3 style = {{marginTop: "20px"}}>What does it mean to be an in network provider vs. an out of network provider?</h3>
                    <ul className = "infoBox">
                        <li>This is something to look at on two different levels.</li>
                        <li>BSSC providers are contracted with many health insurance companies to provide services to plan members for specific pre-negotiated rates (i.e. HPHC, BCBS, Cigna, Multiplan), hence making them “in-network providers”.  </li>
                        <li>There are some insurance BSSC doctors are not contracted with (i.e. HNE, Tufts network health, Dr. Mckeon not contracted with NHP) hence making them “out-of-network providers”.</li>
                        <li>Some insurance plans will allow patients to see out-of-network providers because the plan has out of network benefits. For example Dr. McKeon is not contracted with HNE but a patient who has HNE with out-of-networks benefits can see doctors who are contracted with Multiplan. This allows the patient to see Dr. Mckeon without obtaining approval from pcp/insurance because Dr. McKeon is contracted with Multiplan. </li>
                        <li>Patients with no out-of-network benefits can request an exception to see an out-of-network provider. There is a 50/50 chance this request will be denied. If requested if approved, claims will get processed with in-network benefits. If denied patient will be self-pay.</li>
                        <li>Although doctors can be in-network providers with insurance carriers there are also hospital networks. Hospital networks affect patients with HMO and POS insurance plans. In most cases PCPs will not issue health insurance referrals to specialists that are not in the hospital network (ex: A Stewart hospital PCP will not issue a referral to a BSSC doc because we are docs are not Stewart docs, we are NEBH docs). If a referral is denied for this reason we can refer patients to a NEBH PCP. This site will give list of <a href = "http://www.nebh.org/find-a-doctor/search-results?specialty=Internal+Medicine">NEBH PCPs</a></li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "MVA">
            <div className = "titleBanner">
                    <h1>Motor Vehicle Accidents</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul className = "infoBox">
                        <li>PIP stands for personal insurance protection (personal injury protection), and it is an extension of car insurance that covers medical expenses and, in many cases, lost wages</li>
                        <li>BSSC need a copy of PIP exhaust letter in order to bill health insurance</li>
                        <li>PIP exhaust letter is usually generated by the car insurance company once they have paid $2000 in medical expenses</li>
                        <li>As stated in our billing policy, BSSC will not bill MVA insurance carriers or attorneys for services rendered. All visits are to be paid in full at the time of the visits. BSSC will assist patients in obtaining payment from their insurance company by providing any necessary documentation at their request.</li>
                        <li>If patient hasn’t exhausted their PIP and is self-paying it is very important to confirm we accept their health insurance. Patient should also check with their PCP to be sure they can obtain a referral. We will need to bill health insurance once PIP is exhausted</li>
                        <li>Motor Vehicle Accident means patient was in a car. Not on a bike hit by a car.</li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "Visco Billing">
                <div className = "titleBanner">
                    <h1>Viscosupplementation Billing</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul className = "infoBox">
                        <li>BCBS of MA will not cover drug. Patient must pay out-of-pocket in full at the first visit for the drug. Charge patient $800 for Synvisc 1, Synvisc 3, Orthovisc, and Euflexxa. Charge patient $1200 for Monovisc. Patient will also be responsible for copay, coinsurance and deductible. All payments must be collected in Athena. <strong>ALWAYS CHECK TO SEE IF PATIENT HAS SEPARATE DRUG COVERAGE</strong></li>
                        <li>BCBS Federal – You must complete prior auth form. Once approved the drug must be obtained from Caremark. <strong>BSSC WILL NOT BUY AND BUY</strong></li>
                        <li>HPHC – Patient has to use Synvisc One or Euflexxa. Patient has to use and fail both Synvisc One and Euflexxa before moving to Orthovisc or Monovisc. You must fill out the HPHC prior authorization request form. Here is the link to access the <a href="https://www.harvardpilgrim.org/pls/portal/docs/PAGE/PROVIDERS/MANUALS/REFERRAL/D-2%20HYALURONATE%20PREP%20FOR%20OA%20OF%20KNEE%20AUTH%20FORM.EXT_071514.PDF">form</a></li>
                        <li>Tufts and Tufts Medicare Preferred – You must fill out the Universal Pharmacy Programs Request Form and wait for response in writing prior to providing visco to patient. For tufts plans (non-Medicare) once approved the drug must be obtained from Caremark. <strong>BSSC WILL NOT BUY AND BILL</strong></li>
                        <li>Here is the link to access the <a href = "https://tuftshealthplan.com/documents/providers/forms/universal-pharmacy-programs-request-form">form</a></li>
                        <li>Workman’s Compensation – You must obtain fee agreement from adjuster and UR approval. The drug is non-negotiable.</li>
                        <li><strong>After you have received the approval send the approval letter to Violaine. </strong></li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "Self Pay">
                <div className = "titleBanner">
                    <h1>Self Pay References</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <h3>Square Reader</h3>
                    <ul className = "infoBox">
                        <li> All patients much sign waiver (Medicare patients should sign ABN form) – NO EXCEPTIONS</li>
                        <li>Patient cases must be created in Athena and assigned to billing</li>
                        <li>If you don't see an item on the square reader, notify Violaine</li>
                    </ul>
                </div>
                <h3 style = {{color: "white"}}>Square Reader Fees</h3>
                <div className = "outsidePhonesGrid">
                    <div>Acupuncture initial eval</div>
                    <div>$150</div>
                    <div>Acupuncture f/u</div>
                    <div>$90</div>
                    <div>Acupuncture - 10 Appt Package (including initial eval)</div>
                    <div>$864</div>
                    <div>Acupuncture - 10 Appt Package (all f/u appts)</div>
                    <div>$810</div>
                    <div>Even up</div>
                    <div>$35</div>
                    <div>Go Girl</div>
                    <div>$15</div>
                    <div>Hyalgan (foot/ankle - 3 injections)</div>
                    <div>$300</div>
                    <div>Hyalgan (shoulder - 2 injections)</div>
                    <div>$200</div>
                    <div>Ice Machine (Jawa Only)</div>
                    <div>$175</div>
                    <div>Ice Machine (other providers)</div>
                    <div>$275</div>
                    <div>Miner initial eval</div>
                    <div>$1000</div>
                    <div>Miner f/u</div>
                    <div>$250</div>
                    <div>PRP</div>
                    <div>$1200</div>
                    <div>PRP (two sites)</div>
                    <div>$1500</div>
                    <div>Reparel Shoulder Support (DME)</div>
                    <div>$125</div>
                    <div>Amniotic membrane graft</div>
                    <div>$2100</div>
                    <div>Bilateral Amniotic membrane graft</div>
                    <div>$4200</div>
                    <div>Toilet seat</div>
                    <div>$100</div>
                    <div>Visco (Sinvisc/Euflexxa/Orthovisc)</div>
                    <div>$800</div>
                    <div>Visco (Monovisc and Gel)</div>
                    <div>$1200</div>
                </div>
                <h3 style = {{color: "white"}}>Athena Fees</h3>
                <div className = "outsidePhonesGrid">
                    <div>New Patient Visit</div>
                    <div>$450</div>
                    <div>Est. Patient Visit</div>
                    <div>$225</div>
                    <div>DME</div>
                    <div>Ask billing</div>
                    <div>Medication (cortisone, Xiaflex)</div>
                    <div>Ask billing</div>
                </div>
            </div>
            <div className = "documentCard" id = "NEBH Specialty Practice">
                <div className = "titleBanner">
                    <h1>NEBH Orthopedic Specialty Practice Program</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul className = "infoBox">
                        <li>Medical Director: Thomas H Wuerz, MD - twuerz@nebh.org</li>
                        <li>Practice Leader:  Tara Mounsey, NP- tmounsey@nebh.org</li>
                        <li>NEBMA Practice Manager:  Ellie Yuen - eyuen@nebh.org    (617)-754-5936</li>
                        <li>Surgical Coordinator:  Mayrelli Martinez-   mmarti15@nebh.org</li>
                        <li>Location:  NEBH Main Campus – 6th Floor of Converse Building</li>
                        <li>Scope: Patients seeking Spine, Arthroplasty or Sports Medicine care will be seen by  NEBH fellows and attending physicians for evaluation, diagnosis and treatment</li>
                        <li>Scheduling:  Appointments can be scheduled by calling (617)-754-5940 </li>
                        <li>In an effort to effectively triage patients requiring spine services, we ask that patients who have been referred to the Orthopedic Specialty Practice for spine services (who have not previously seen a spine specialist), please contact the Spine Center at (617)-754-5246 for an initial assessment. If the patient requires surgical intervention, he/she will be directed to the Practice.</li>
                        <li>Plans accepted
                            <ul>
                                <li>Standard MassHealth</li>
                                <li>Neighborhood Health Plan</li>
                                <li>Commonwealth Care Alliance</li>
                                <li>Senior Whole Health</li>
                                <li>Tufts Health Public Plans (formerly Network Health) Direct and Together plans</li>
                                <li>Medicare (only if primary, with Medicaid secondary</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "Add Insurance">
                <div className = "titleBanner">
                    <h1>How to Add Insurance</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul className = "infoBox">
                        <li>Our most used insurances are listed in the top 50. If you have to search for an insurance package, you should ask for address on the back of the insurance card and phone number listed on card for provider to call. These two pieces of information should narrow down search and help you find the correct insurance package.</li>
                        <li>Insurance eligibility must be checked each time patient call to schedule an appointment.</li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "Patient Balance">
                <div className = "titleBanner">
                    <h1>Patient Balance</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul className = "infoBox">
                        <li>Patient should always be informed of their balance:
                            <ul>
                                <li>When making the appt</li>
                                <li>When checking in</li>
                                <li>If needed prior to surgery</li>
                            </ul>
                        </li>
                        <li>The goal is to collect when informed.  Notes should be put in Athena when pt is informed and money is <strong>not</strong> collected</li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "MA Workflow for SOS">
                <div className = "titleBanner">
                    <h1>MA Workflow for SOS</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul className = "infoBox">
                        <li>Coordinator books patient for surgery, gets consent signed, sends patient to the waiting room, flags down/buzzes one of the MAs to enroll the patient.</li>
                        <li>Enroll patient into SOS on the PC.
                            <ul>
                                <li><a href="https://surgicaloutcomesystem.com/portal/">https://surgicaloutcomesystem.com/portal/</a> Login ⇒ "Patients" ⇒ "Enroll Patient"</li>
                                <li>Username: slawler@bostonssc.com password: ask Brenda</li> 
                                <li>If patient’s date of surgery is pending, input date of surgery as the last day of the year (e.g. December 31st, 2017)</li>
                            </ul>
                        </li>
                        <li>Enroll patient into SOS on the PC. Pull up patient’s preop forms on an iPad.
                            <ul>
                                <li>On the PC, click patient’s ID # ⇒ “Pre-surgery survey (pending)”.  On the bottom left is “ID” and “PIN”.</li>
                                <li>On the iPad, find the “SOS pt login” icon on the bottom bar.  Use ID and PIN to log into the preop forms.</li>
                            </ul>
                        </li>
                        <li>Bring iPad to patient in waiting room.  Explain the following:
                            <ul>
                                <li>The questions will take approximately 10-15 minutes.</li>
                                <li>Once done, return the iPad to the front desk and then they are free to go!</li>
                                <li>This system will send emails with a simple link to fill out the follow-up forms.  The first email can be disregarded, because it contains the preop forms which are being done same-day on the iPad.  But for emails after surgery, <strong>it is very important for Dr. _______’s sake that you take 5 minutes to fill these postop forms out </strong> (they are much shorter than the preop forms)!</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "Visco and Zilretta Injections">
                <div className = "titleBanner">
                    <h1>Visco and Zilretta Injections</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul className = "infoBox">
                        <li><strong>Viscosupplementation - Hyaluronic Acid Injections</strong>
                            <ul>
                                <li>
                                    Medications
                                    <ul>
                                        <li>Euflexxa, Orthovisc, Synvisc: 3 injections, 1x/wk for 3 wks (5-14 days between)</li>
                                        <li>Monovisc, GelOne, Durolane, SynviscOne:  1x injection</li>
                                        <li>Hyalgan:  <strong>Knee - </strong> can be 3 or 5 injections (ask MD or PA which preferred)  
                		                    <strong> Shoulder - </strong>1 injection, 2 syringes. Not covered by ins. Self pay.</li>
                                    </ul>
                                </li>
                                <li>Pricing / Self Pay
                                    <ul>
                                        <li>Euflexxa, Orthovisc and Synvisc = $800 per knee</li>
                                        <li>Monovisc, GelOne and Durolane $1200 per knee</li>
                                        <li>Hyalgan: Knee = $100 per syringe; Shoulder = $200</li>
                                    </ul>
                                </li>
                                <li>Scheduling
                                    <ul>
                                        <li>6 months MUST elapse between Visco series. Cannot be done early for ANY insurance. Please check the date of the last inj done before sending Kayla a case. (Note - 12 months must elapse between series for BCBS-FEP plans).</li>
                                        <li>HPHC and Tufts require OV notes for approval. Established pts will need to come in for a follow up visit before we can re-submit.</li>
                                        <li>Bilateral knees: injections can be done at same appointment if both knees are approved.</li>
                                        <li>Appointment notes must state whether injections are BSSC supply or pt supply</li>
                                        <li>For pt supply, appointments cannot be scheduled until the medication arrives in the office.</li>
                                        <li>Please contact Kayla or appropriate coordinator if you need help scheduling.</li>
                                    </ul>
                                </li>
                                <li>Authorization
                                    <ul>
                                        <li>BSSC Supply: Kayla obtains approval and the medication is supplied by us. <strong>HPHC and Medicare only</strong></li>
                                        <li>Pt Supply: Kayla obtains approval and the medication is dispensed by a Specialty Pharmacy, and then delivered to our office (this process takes longer). <strong>ALL other insurance</strong></li>
                                        <li>Please follow guideline:
                                            <ul>
                                                <li>Has it been 6 months plus one day since the LAST injection?
                                                    <ul>
                                                        <li>YES- go to step #2</li>
                                                        <li>NO- inform patient how long it is until they are eligible
                                                            <ul>
                                                                <li>IF over a month long, offer patient an appt with provider</li>
                                                                <li> IF under a month long, proceed to step #2</li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li>Check the insurance
                                                    <ul>
                                                        <li>Medicare - check the secondary ins
                                                            <ul>
                                                                <li>If MASSHEALTH or TUFTS- send a case to Kayla to obtain auth.</li>
                                                                <li> Any other secondary- OK to schedule 6 months and 1 day after the last injection. BSSC Supply. </li>
                                                            </ul>
                                                        </li>
                                                        <li>Medicare supplement plans - send case to Kayla</li>
                                                        <li>All other insurance - send case to Kayla</li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>BCBS of MA plans do not cover Visco per Medical policy 427. Please send Kayla a case to check for additional RX coverage, but make sure pt is aware it may not be covered.</li>
                                        <li>Please Note:  Martine obtains Visco auth for Richmond pts, and Kieana obtains Visco auth for work comp pts. Please send all other requests to Kayla</li>
                                    </ul>
                                </li>
                                <li>Patient cases
                                    <ul>
                                        <li>Case Subject: must include Product Name, Extremity and Laterality</li>
                                        <li>Case Description: must include Date of last Injection and where the pt would like next injection</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li><strong>Zilretta</strong>
                            <ul>
                                <li>Zilretta is a 1x extended release cortisone injection. Authorization is required before scheduling. Please send a case to Kayla to check coverage</li>
                                <li>Zilretta is BSSC supply for most insurances.</li>
                                <li>BCBS-MA:  Zilretta may be obtained through Acaria Specialty Pharmacy (pt supply).</li>
                                <li>Medicare- check secondary ins:
                                    <ul>
                                        <li>If MASSHEALTH, TUFTS, or BCBS-FEP- send case to Kayla for auth. </li>
                                        <li>Any other secondary - okay to schedule injection (initials only)</li>
                                    </ul>
                                </li>
                                <li>Aetna does NOT cover Zilretta</li>
                                <li>Zilretta is only intended for single use. <strong>NO REPEATS</strong>, pt must self pay- $800. Exceptions below:
                                    <ul>
                                        <li>Richmond pts - send case to Martine</li>
                                        <li>BCBS plans - send case to Kayla to see if medication will be supplied by Acaria</li>
                                    </ul>
                                </li>
                                <li>
                                    Bilateral knees must be done on separate days if BSSC supply
                                </li>
                                <li><strong>No Zilretta injections done in Bourne office</strong></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "Worker's Comp">
                <div className = "titleBanner">
                    <h1>Worker's Comp</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                    <ul className = "infoBox">
                        <li><strong>New Patient</strong>
                            <ul>
                                <li>Send to WC line, Stacy or Andrew</li>
                            </ul>
                        </li>
                        <li><strong>Est. WC Patient</strong>
                            <ul>
                                <li>After one year, we need to verify Claim i.e. Continuation of Care sheet.  Adj has to sign stating the WC is still active and they will continue to pay the fee.</li>
                                <li>Send case to Stacy or Andrew</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className = "documentCard" id = "Xrays">
                <div className = "titleBanner">
                    <h1>Xrays - Hours of Operation</h1>
                    <a className = "searchItem" href = "#Search">Top</a>
                </div>
                <div className = "insurancesBox">
                <ul className = "infoBox">
                    <li>NEBH - Doesn't open til 8, closes at 4</li>
                    <li>Dedham - opens at 7, closes at either 4 or 5</li>
                    <li>Waltham - open to close</li>
                    <li>Bourne - open to close</li>
                    <li>Braintree - open to close</li>
                </ul>
                </div>
            </div>
        </div>
        
    )
}

export default Documentation