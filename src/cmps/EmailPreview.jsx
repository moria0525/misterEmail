import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LuMailOpen } from "react-icons/lu";
import { IoShareOutline } from "react-icons/io5";


export function EmailPreview({ email, onUpdateEmail, onUpdateStar }) {
    const [isRead, setIsRead] = useState(email.isRead)
    const [isStar, setIsStar] = useState(email.isStarred)
   // const dynClass = isRead ? 'read' : 'unread'
    const handleClick = () => {
        setIsStar(current => !current)
        onUpdateStar(email)
    }

    return (
        <div className="email-main">
            <span className="icon" onClick={handleClick}>  {isStar ? <FaStar /> : <FaRegStar />}</span>
            <Link to={`/email/${email.id}`} onClick={() => { setIsRead(isRead), onUpdateEmail(email) }}>
                <article className="email-preview">
                    <div className="icon-star">
                        <span>{email.from}</span>
                    </div>
                    <span className="subject">{email.subject}</span>
                    <h4 className="email-sentat">{email.sentAt}</h4>
                </article>
            </Link>
            <div className="email-hover">
                <IoShareOutline />
                <LuMailOpen />
                <FaTrash />
            </div>
        </div>
    );
}

