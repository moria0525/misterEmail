import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { MdOutlineKeyboardArrowUp } from "react-icons/md"

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function handelChange(ev) {
        let { name: field, value } = ev.target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    const { body, isRead } = filterByToEdit
    return (
        <section className="email-filter">
            <form>
                <label htmlFor="body">Search</label>
                <input onChange={handelChange} id="body" value={body} name="body" type="text" />
            </form>
            <label htmlFor="dropSearch"></label>
            <select value={isRead} onChange={handelChange} name='isRead'>
                <option value="Read">Read</option>
                <option value="unRead">unRead</option>
            </select>
        </section>
    )
}
