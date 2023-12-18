import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { emailService } from "../services/email.service"
import { FaFirstdraft, FaInbox, FaRegStar, FaTrash } from "react-icons/fa"
import { EmailList } from "./EmailList"
import { EmailIndex } from "../pages/EmailIndex"
import { IoSendOutline } from "react-icons/io5"


export function EmailFolderList({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    return (
        <ul className="email-menu">
        <li><label className="box-inbox" onClick={() => { alert('inbox') }}>
            <FaInbox /> Inbox
        </label>
        </li>
        <li>
            <span className="box-starred" onClick={() => setFilterByToEdit({ status: 'star' })}>
                <FaRegStar />Starred
            </span>
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
            <span className="box-trash" onClick={() => setFilterByToEdit({ status: 'trash' }) }>
                <FaTrash /> Trash
            </span>
        </li>
    </ul>
       
    )
}
