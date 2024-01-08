import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service";

export function EmailEdit() {
    const [email, setEmail] = useState(emailService.createEmail());
    const [isFullscreen, setIsFullscreen] = useState(false); // Step 1

    const { onAddEmail, onUpdateEmailRead } = useOutletContext();
    const navigate = useNavigate();
    const { emailId } = useParams();

    useEffect(() => {
        console.log("email",email)
        if (emailId) loadEmail();
    }, [emailId]);


    useEffect(() => {
        const timer = setTimeout(() => {
            onSaveDraft()
        }, 5000);
        return () => clearTimeout(timer);
      }, [email]);


    async function loadEmail() {
        try {
            const email = await emailService.getById(emailId);
            setEmail(email);
        } catch (err) {
            navigate('/email');
            console.log('Had issues loading email', err);
        }
    }
    function toggleFullscreen() {
        var elem = document.getElementById("email-edit");
        if (elem && elem.requestFullscreen) {
            elem.requestFullscreen().then(() => {
                setIsFullscreen((prevIsFullscreen) => !prevIsFullscreen);
            }).catch((error) => {
                console.error('Error entering fullscreen mode:', error);
            });
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

    async function onSaveDraft() {

        if (email.id===undefined) {
            const addedMail = await onAddEmail(email)
            setEmail(addedMail)
        }
        if (email.id) 
        emailService.save(email)
        
    }

    async function onSaveEmail(ev) {
        ev.preventDefault();
        try {
            const updatedEmail = {
                ...email,
                from:"user@appsus.com",
                sentAt: utilService.convertDate(Date.now()),
                body: ev.target.body.value,
                isRead: false,
            };
            setEmail(updatedEmail);
            if (email.id) {
                await onUpdateEmailRead(updatedEmail);
            } else {
                await onAddEmail(updatedEmail);
            }
            navigate('/email');
        } catch (err) {
            console.log('Had issues saving email', err);
        }
    }

    async function onSetStatus() {
        try {
            const updatedEmail = { ...email, isRead: false };
            setEmail(updatedEmail);
            await onUpdateEmailRead(updatedEmail);
        } catch (err) {
            console.log('Had issues updating email status', err);
        }
    }

    const {from, id,to, subject, body } = email || {}
    //const date = utilService.convertDate(Date.now())


    const userEmail = emailService.getUser()
    const emailEditClass = isFullscreen ? "email-edit-fullscreen" : "email-edit";

    return (
        <section className={emailEditClass} id="email-edit">
            <div className="icon-compose" id="icon-compose" >
                <Link to="/">
                    <button className="close-btn">X</button>
                </Link>
                <button
                    className="fullScreen-btn"
                    type="button"
                    onClick={toggleFullscreen}
                >
                    &#x26F6;
                </button>
                <Link to="/">
                    <button className="minimaz-btn">&#95;</button>
                </Link>
            </div>
            <h1>{id ? 'Edit ' : 'Add '} Email</h1>
            <form onSubmit={onSaveEmail}>

                <label htmlFor="from">from: {userEmail.fullname} &lt;{userEmail.email}&gt;</label>

                <label htmlFor="to">to:</label>
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


