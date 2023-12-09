import React from "react";
import { FaHourglassEnd, FaRegStar, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { LuMailOpen } from "react-icons/lu";
import { IoShareOutline } from "react-icons/io5";

export function EmailPreview({ email }) {
    return (
        <div className="email-main">
            <div className="email-preview">
                <div className="icon-star" onClick={() => { alert('clicked star') }}>
                    <FaRegStar />
                    <span>{email.from}</span>
                </div>
                <h4>{email.subject}</h4>
                <h4 className="email-sentat">{email.sentAt}</h4>
            </div>
            <div className="email-hover">
                <IoShareOutline />
                <LuMailOpen />
                <FaTrash />
            </div>
        </div>
    );
}
