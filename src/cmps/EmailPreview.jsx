import { Link } from "react-router-dom";

export function EmailPreview({ email }) {
    console.log(email);
    return (
        <article className="email-preview">
            <h1>{email.from}</h1>
            <h2>{email.subject}</h2>
            <h4>{email.sentAt}</h4>
        </article>
    )
}
