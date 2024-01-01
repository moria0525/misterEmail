import { useEffect, useState } from "react"
import { FaFirstdraft, FaInbox, FaRegStar, FaTrash } from "react-icons/fa"
import { IoSendOutline } from "react-icons/io5"
import "/src/assets/css/cmps/email-folder-list.css";
import { Link } from "react-router-dom";

export function EmailFolderList() {

    const [filterByToEdit, setFilterByToEdit] = useState(null)

    // useEffect(() => {
    //     onSetFilter(filterByToEdit)
    // }, [filterByToEdit])

    return (
        <div className="bar-side">
            <ul className="box-list">
                <li>
                    <Link to={`/inbox`} className="box-inbox" onClick={() => setFilterByToEdit({ status: 'inbox' })}>
                        <FaInbox />Inbox
                    </Link>
                </li>
                <li>
                    <Link to={`/star`} className="box-starred" onClick={() => setFilterByToEdit({ status: 'star' })}>
                        <FaRegStar />Starred
                    </Link>
                </li>
                <li>
                    <Link to={`/sent`} className="box-sent" onClick={() => setFilterByToEdit({ status: 'sent' })}>
                        <IoSendOutline />Sent
                    </Link>
                </li>
                <li>
                    <Link to={`/draft`} className="box-draft" onClick={() => setFilterByToEdit({ status: 'draft' })}>
                        <FaFirstdraft />Draft
                    </Link>
                </li>
                <li>
                    <Link to={`/trash`} className="box-trash" onClick={() => setFilterByToEdit({ status: 'trash' })}>
                        <FaTrash />Trash
                    </Link>
                </li>
            </ul>
        </div>
    )
}
