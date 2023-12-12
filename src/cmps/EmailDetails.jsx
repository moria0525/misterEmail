import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router"
import { emailService } from "../services/email.service"


export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    console.log(params)

    useEffect(() => {
        loadEmail()
    }, [params.emailId])

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onBack() {
        navigate('/email/')
    }
 
    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details">
            <h3>{email.sentAt}</h3>
            <h3>from: {email.from}</h3>
            <h3>subject: {email.subject}</h3>
            <h3>{email.txt}</h3>
            
            <button onClick={onBack}>Back</button>
        </section>
    )
}
 
            // <h3>Type: {robot.type}</h3>
            // <h3>Model: {robot.model}</h3>
            // <h3>Battery: {robot.batteryStatus}</h3>
            // <Link to={`/robot/r3`} >Next Robot</Link> */
            