import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailEdit() {

    const [email, setEmail] = useState(emailService.createEmail())
    const { onAddEmail, onUpdateEmail } = useOutletContext()
    const navigate = useNavigate()
    const { emailId } = useParams()

    useEffect(() => {
        if (emailId) loadEmail()
    }, [])

    async function loadEmail() {
        try {
            const email = await emailService.getById(emailId)
            setEmail(email)
        } catch (err) {
            navigate('/email')
            console.log('Had issues loading email', err);
        }
    }

    function handleChange({ target }) {
        let { name: field, value, to } = target
        switch (to) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }
        setEmail((prevEmail) => ({ ...prevEmail, [field]: value }))
    }
    async function onSaveEmail(ev) {
        ev.preventDefault();
        try {
            const updatedEmail = {
                ...email,
                sentAt: utilService.convertDate(Date.now()),
                body: ev.target.body.value,
                isRead: false,
            };
            setEmail(updatedEmail);
            if (email.id) {
                await onUpdateEmail(updatedEmail);
            } else {
                await onAddEmail(updatedEmail);
            }
            navigate('/email/:folder');
        } catch (err) {
            console.log('Had issues saving email', err);
        }
    }
    
    async function onSetStatus() {
        try {
            const updatedEmail = { ...email, isRead: false };
            setEmail(updatedEmail);
            await onUpdateEmail(updatedEmail);
        } catch (err) {
            console.log('Had issues updating email status', err);
        }
    }
    
    const { from, to, subject, body, sentAt} = email
    //const date = utilService.convertDate(Date.now())
    return (
        <section className="email-edit">
            <Link to="/"><button className="close-btn">X</button></Link>
            <h1>{email.id ? 'Edit ' : 'Add '} Email</h1>
            <form onSubmit={onSaveEmail}>

                {/* <label htmlFor="date" value={sentAt} onChange={handleChange} >{date}</label> */}
                <p>Sent at: {123}</p>
                <label htmlFor="from">from</label>
                <input value={from} onChange={handleChange}
                    to="text" id="from" name="from" />

                <label htmlFor="to">to</label>
                <input value={to} onChange={handleChange}
                    to="text" id="to" name="to" />

                <label htmlFor="subject">subject</label>
                <input value={subject} onChange={handleChange}
                    to="text" id="subject" name="subject" />

                <label htmlFor="body"></label>
                <textarea value={body} onChange={handleChange}
                    to="text" id="body" name="body" />

                <button onClick={onSetStatus}>Send</button>
            </form>
        </section>
    )
}
