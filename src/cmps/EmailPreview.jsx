import React, { useState } from "react";
import { FaRegStar, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LuMailOpen } from "react-icons/lu";
import { IoShareOutline } from "react-icons/io5";

export function EmailPreview({ email,  onUpdateEmail }) {
    // const [isStar, setIsStar ] = useState(email.isStarred)
    
     const isRead = "read"
    
    return (
        <div className="email-main">
            <Link to={`/email/${email.id}`} onClick={() => {onUpdateEmail(email)}}>
                <article className= {`email-preview ${isRead}`}>
                    <div className="icon-star" onClick={() => { alert('clicked star') }}>
                        <FaRegStar />
                        <span>{email.from}</span>
                    </div>
                    <h4>{email.subject}</h4>
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

