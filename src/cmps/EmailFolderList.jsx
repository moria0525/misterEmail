import { useEffect, useState } from "react"
import { FaFirstdraft, FaInbox, FaPen, FaRegStar, FaTrash } from "react-icons/fa"
import { IoSendOutline } from "react-icons/io5"
import "/src/assets/css/cmps/email-folder-list.css";

export function EmailFolderList({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    return (
        <div className="bar-side">
            <ul className="box-list">
                <li><span className="box-inbox" onClick={() => setFilterByToEdit({ status: 'inbox' })}>
                    <FaInbox /> Inbox
                </span>
                </li>
                <li>
                    <span className="box-starred" onClick={() => setFilterByToEdit({ status: 'star' })}>
                        <FaRegStar />Starred
                    </span>
                </li>
                <li>
                    <span className="box-sent" onClick={() => setFilterByToEdit({ status: 'sent' })}>
                        <IoSendOutline /> Sent
                    </span>
                </li>
                <li>
                    <span className="box-draft" onClick={() => setFilterByToEdit({ status: 'draft' })}>
                        <FaFirstdraft /> Draft
                    </span>
                </li>
                <li>
                    <span className="box-trash" onClick={() => setFilterByToEdit({ status: 'trash' })}>
                        <FaTrash /> Trash
                    </span>
                </li>
            </ul>
        </div>
    )
}
