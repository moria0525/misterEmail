import { FaPen} from "react-icons/fa";
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onUpdateEmail, onUpdateStar }) {
    return (
        <div className="email-container">
            <div className="left-sidebar">
                <button className="box-compose" onClick={() => { alert('compose') }}>
                    <FaPen /> Compose
                </button>
            </div>
            <div className="email-content">
                <ul className="email-list">
                    {emails.map(email =>
                        <li key={email.id}>
                            <EmailPreview email={email} onUpdateEmail={onUpdateEmail} onUpdateStar={onUpdateStar} />
                        </li>
                        
                    )}
                </ul>
            </div>
        </div>
    );
}
