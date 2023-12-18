
import { FaCompass, FaEdit, FaFirstdraft, FaInbox, FaPen, FaRegStar, FaSearch, FaStar, FaTrash } from "react-icons/fa";
import { EmailPreview } from "./EmailPreview";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";
import { EmailFolderList } from "./EmailFolderList";
import { Link } from "react-router-dom";

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
                            <div className="email-actions"></div>
                        </li>
                        
                    )}
                </ul>
            </div>
        </div>
    );
}
