import { FaPen} from "react-icons/fa";
import { EmailPreview } from "./EmailPreview";
import "/src/assets/css/cmps/email-list.css";

export function EmailList({ emails, onUpdateEmail, onUpdateStar }) {
    return (
        <div className="email-container">
                <ul className="email-list">
                    {emails.map(email =>
                        <li key={email.id}>
                            <EmailPreview email={email} onUpdateEmail={onUpdateEmail} onUpdateStar={onUpdateStar} />
                        </li>
                    )}
                </ul>
            </div>
    );
}
