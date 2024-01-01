import { FaPen} from "react-icons/fa";
import { EmailPreview } from "./EmailPreview";
import "/src/assets/css/cmps/email-list.css";
import { utilService } from "../services/util.service"


export function EmailList({emails, folder, onUpdateEmailRead, onUpdateStar }) {
    return (
        <div className="email-container">
                <ul className="email-list">
                    {emails.map(email =>
                        <li key={email.id}>
                            <EmailPreview email={email} folder={folder} onUpdateEmailRead={onUpdateEmailRead} onUpdateStar={onUpdateStar} />
                        </li>
                    )}
                </ul>
            </div>
    );
}
