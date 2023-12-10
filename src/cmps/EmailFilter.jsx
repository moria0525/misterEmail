import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    function handelChange(ev) {
        let { name: field, value } = ev.target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    const { subject } = filterByToEdit
    return (
        <form className="email-filter">
            <label htmlFor="subject">Search</label>
            <input onChange={handelChange} id="subject" value={subject} name="subject" type="text" />
        </form>
    )
}
