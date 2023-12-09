
import { FaCompass, FaEdit, FaFirstdraft, FaInbox, FaPen, FaRegStar, FaSearch, FaStar, FaTrash } from "react-icons/fa";
import { EmailPreview } from "./EmailPreview";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { IoSendOutline } from "react-icons/io5";

export function EmailList({ emails, onRemoveEmail }) {
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
                <div className="search-container">
                    <div className="search-icon"></div>
                    <input type="text" className="search-input" placeholder="Search"/>
                </div>
                <button className="filter-date" onClick={() => { alert('filter date') }}>
                    <MdOutlineKeyboardArrowUp /> Date
                </button>
                <button className="filter-subject" onClick={() => { alert('filter subject') }}>
                    <MdOutlineKeyboardArrowUp /> Subject
                </button>
                <button className="filter-all" onClick={() => { alert('filter all') }}>
                    <MdOutlineKeyboardArrowUp />   All
                </button>
                <ul className="email-list">
                    {emails.map(email =>
                        <li key={email.id}>
                            <EmailPreview email={email} />
                            <div className="email-actions"></div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}