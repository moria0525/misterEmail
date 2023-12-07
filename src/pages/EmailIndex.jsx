import { useEffect, useState } from "react"
import { Emailservice } from "../services/email.service"
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";

export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(Emailservice.getDefaultFilter())

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        const emails = await Emailservice.query(filterBy)
        setEmails(emails)
    }

    async function onRemoveEmails(emailId) {
        try {
            await Emailservice.remove(emailId)
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
    const { status, txt, isRead } = filterBy
    return (
        <section className="email-index">
            <h1>Welcome! this is our misterEmail</h1>
            <EmailFilter filterBy={{ status, txt, isRead }} onSetFilter={onSetFilter} />
            <EmailList emails={emails} onRemoveEmails={onRemoveEmails} />
        </section>
    )
}
