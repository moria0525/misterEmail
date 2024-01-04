import { useEffect, useState } from "react"
import { FaFirstdraft, FaInbox, FaRegStar, FaTrash } from "react-icons/fa"
import { IoSendOutline } from "react-icons/io5"
import "/src/assets/css/cmps/email-folder-list.css";
import { Link } from "react-router-dom";

export function EmailFolderList({ emails }) {

    const [filterByToEdit, setFilterByToEdit] = useState(null)
    const [inboxCounter, setCounterInbox] = useState(0);
    const [starCounter, setCounterStar] = useState(0);
    const [draftCounter, setCounterDraft] = useState(0);
    const [trashCounter, setCounterTrash] = useState(0);

    useEffect(() => {
        updatesCounters();
      }, [emails]);


      async function updatesCounters() {
        try {
          const inboxEmails = emails.filter((email) => !email.isRead)
          setCounterInbox(inboxEmails.length);
          const starEmails = emails.filter((email) => email.isStarred)
          setCounterStar(starEmails.length)
            
          const draftEmails = emails.filter((email) => !email.isRead)
          setCounterDraft(draftEmails.length);
            
          const trashEmails = emails.filter((email) => email.removedAt)
          setCounterTrash(trashEmails.length);
        } catch (error) {
          console.log("Error sorting emails:", error)
        }
      }

return (
    <div className="bar-side">
        <ul className="box-list">
            <li>
                <Link to={`/inbox`} className="box-inbox" onClick={() => setFilterByToEdit({ status: 'inbox' })}>
                    <FaInbox />Inbox {inboxCounter > 0 ? inboxCounter : null}
                </Link>
            </li>
            <li>
                <Link to={`/star`} className="box-starred" onClick={() => setFilterByToEdit({ status: 'star' })}>
                    <FaRegStar />Starred {starCounter > 0 ? starCounter : null}
                </Link>
            </li>
            <li>
                <Link to={`/sent`} className="box-sent" onClick={() => setFilterByToEdit({ status: 'sent' })}>
                    <IoSendOutline />Sent
                </Link>
            </li>
            <li>
                <Link to={`/draft`} className="box-draft" onClick={() => setFilterByToEdit({ status: 'draft' })}>
                    <FaFirstdraft />Draft {draftCounter > 0 ? draftCounter : null}
                </Link>
            </li>
            <li>
                <Link to={`/trash`} className="box-trash" onClick={() => setFilterByToEdit({ status: 'trash' })}>
                    <FaTrash />Trash {trashCounter > 0 ? trashCounter : null}
                </Link>
            </li>
        </ul>
    </div>
)
}



