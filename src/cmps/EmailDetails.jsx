import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { emailService } from "../services/email.service"
import { FaTrash } from "react-icons/fa"
import { utilService } from "../services/util.service"

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadEmail()
    }, [params.emailId,params.folder])

    async function loadEmail() {
        try {
            const email = await emailService.getById(params.emailId)
            setEmail(email)
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onBack() {
        navigate('/:folder')
    }


    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details">
            <FaTrash className="email-trash" onClick={() => { emailService.onRemoveEmail(email, params.folder) }} />
            <h2>{email.sentAt}</h2>
            <h2>from: {email.from}</h2>
            <h1>{email.subject}</h1>
            <h3>{email.body}</h3>
            <button className="btn-back" onClick={onBack}>Back</button>
        </section>
    )
}
