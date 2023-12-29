import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { emailService } from "../services/email.service"
import { FaTrash } from "react-icons/fa"


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
        navigate('/email/:folder')
    }

    async function onRemoveEmail(emailId) {
        try {
            await emailService.remove(emailId)
            navigate('/email/')
        } catch (error) {
            console.log('error:', error)
        }
    }

    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details">
            <FaTrash onClick={() => { onRemoveEmail(email.id) }} />
            <h3>{email.sentAt}</h3>
            <h3>from: {email.from}</h3>
            <h3>sentAt: {email.sentAt}</h3>
            <h3>subject: {email.subject}</h3>
            <h3>{email.body}</h3>
            <h3>isRead: {String(email.isRead)}</h3>
            <h3>isStarred: {String(email.isStarred)}</h3>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
