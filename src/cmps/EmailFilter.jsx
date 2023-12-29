import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { MdOutlineKeyboardArrowUp } from "react-icons/md"
import { json } from "react-router"
import { FaPen } from "react-icons/fa"

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function handelChange(ev) {
        let { name: field, value } = ev.target
        if (field !== "body" && value !== 'All') {
            value = JSON.parse(value)
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    const { status, body, isRead } = filterByToEdit
    return (
        <section className="email-filter">
            <div className="box-filter">
            <form>
                <label htmlFor="body"></label>
                <input placeholder="Search in your Email" onChange={handelChange} id="body" value={body} name="body" type="text" />
            </form>
            <label htmlFor="dropSearch"></label>
            <select onChange={handelChange} name='isRead'>
                <option value="All">All</option>
                <option value={true}>Read</option>
                <option value={false}>unRead</option>
            </select>
            </div>
        </section>
    )
}
