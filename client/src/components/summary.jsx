import { useEffect, useState } from "react"
import HomeHeader from "./header"
import Bill from "./bill"
import './../style/bills.css'

const Summary = () => {
    const [list, setList] = useState([])

    useEffect(()=>{
         fetch(`http://localhost:8080/get_summary`, {
            method: 'GET',
         }).then(res => {
            return res.json()
         }).then(data => {
            const bills = data.map((bill)=>{
                return <Bill _id={bill._id} key={bill._id} bill={bill} />
            })

            setList(bills)
         })
    },[])

    return(
        <div>
            <HomeHeader />
            <div className="summary-container">
                {list}
            </div>
        </div>
    )
}

export default Summary;