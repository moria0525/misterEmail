import { useEffect, useState } from "react"
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import "/src/assets/css/cmps/email-index.css";

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

    async function onUpdateEmail(emailToUpdate) {
        try {
            if (!emailToUpdate.isRead) {
            const updatedEmail = {
                ...emailToUpdate,
                isRead: true
            
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
        }
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
    const { status, body, isRead } = filterBy
    return (
        <section className="email-index">
            <EmailFilter filterBy={{ body, isRead }} onSetFilter={onSetFilter} />
            <div className="main-email">
                <EmailFolderList filterBy={status} onSetFilter={onSetFilter} />
                <EmailList emails={emails} onUpdateEmail={onUpdateEmail} onSetFilter={onSetFilter} onUpdateStar={onUpdateStar} />
            </div>
        </section>
    )
}

