import { useEffect, useState } from "react"
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { emailService } from "../services/email.service";

export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        const emails = await emailService.query(filterBy)
        setEmails(emails)
    }

    async function onRemoveEmails(emailId) {
        try {
            await e.remSve(emailId)
            setEmails(prevEmails => {
                return prevEmails.filter(email => email.id !== email.id)
            })
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!emails) return <div>Loading...</div>
    const {subject} = filterBy
    return (
        <section className="email-index">
            <h1>Welcome! this is our misterEmail</h1>
            <EmailFilter filterBy={subject} onSetFilter={onSetFilter}/>
            <EmailList emails={emails} onRemoveEmails={onRemoveEmails} />
        </section>
    )
}

