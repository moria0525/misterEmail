
import { FaCompass, FaEdit, FaFirstdraft, FaInbox, FaPen, FaRegStar, FaSearch, FaStar, FaTrash } from "react-icons/fa";
import { EmailPreview } from "./EmailPreview";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";

export function EmailList({ emails, onRemoveEmail, onUpdateEmail }) {
    console.log(emails)
    return (
        <div className="email-container">
            <div className="left-sidebar">
                <button className="box-compose" onClick={() => { alert('compose') }}>
                    <FaPen /> Compose
                </button>
                <ul className="email-menu">
                    <li><label className="box-inbox" onClick={() => { alert('inbox') }}>
                        <FaInbox /> Inbox
                    </label>
                    </li>
                    <li>
                        <label className="box-starred" onClick={() => { alert('starred') }}>
                            <FaRegStar /> Starred
                        </label>
                    </li>
                    <li>
                        <label className="box-sent" onClick={() => { alert('sent') }}>
                            <IoSendOutline /> Sent
                        </label>
                    </li>
                    <li>
                        <label className="box-draft" onClick={() => { alert('draft') }}>
                            <FaFirstdraft /> Draft
                        </label>
                    </li>
                    <li>
                        <label className="box-trash" onClick={() => { alert('trash') }}>
                            <FaTrash /> Trash
                        </label>
                    </li>
                </ul>
            </div>
            <div className="email-content">
              
             
                <ul className="email-list">
                    {emails.map(email =>
                        <li key={email.id}>
                            <EmailPreview email={email} onUpdateEmail={onUpdateEmail}/>
                            <div className="email-actions"></div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
