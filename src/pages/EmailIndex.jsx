import { useEffect, useState } from "react"
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { emailService } from "../services/email.service";
import { EmailPreview } from "../cmps/EmailPreview";

export function EmailIndex() {

    const [emails, setEmails] = useState(null)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter())
    useEffect(() => {
        loadEmails()
    }, [filterBy, emails])

    async function loadEmails() {
        const emails = await emailService.query(filterBy)
        setEmails(emails)
    }

    async function onRemoveEmails(emailId) {
        try {
            await emailService.remove(emailId)
            setEmails(prevEmails => {
                return prevEmails.filter(email => email.id !== emailId)
            })
        } catch (error) {
            console.log('error:', error)
        }
    }

    async function onUpdateEmail(emailToUpdate) {
        try {
            const updatedEmail = {
                ...emailToUpdate,
                isRead: !emailToUpdate.isRead
            }
            await emailService.save(updatedEmail)
            setEmails(prevEmails => {
                return prevEmails.map(email => {
                    if (email.id === emailToUpdate.id) {
                        return updatedEmail
                    }
                    return email
                })
            })
        } catch (error) {
            console.log('error:', error)
        }
    }
    async function onUpdateStar(email) {
        try {
            console.log(email.isStarred)
            email.isStarred = !email.isStarred
            await emailService.save(email)
            console.log(email.isStarred)
        } catch (error) {
            console.log('error:', error)
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    if (!emails) return <div>Loading...</div>
    const { body } = filterBy
    return (
        <section className="email-index">
            <h1>Welcome! this is our misterEmail</h1>
            <EmailFilter filterBy={body} onSetFilter={onSetFilter} />
            <EmailList emails={emails} onRemoveEmails={onRemoveEmails} onUpdateEmail={onUpdateEmail} onUpdateStar={onUpdateStar} />
        </section>
    )
}

