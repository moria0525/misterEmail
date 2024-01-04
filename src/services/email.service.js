import { EmailIndex } from '../pages/EmailIndex.jsx'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getFilterFromParams,
    onRemoveEmail,
    onUpdateDelete,
}

const STORAGE_KEY = 'emails'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const filterBy = {
    status: 'inbox/sent/star/trash',
    txt: 'puki',
    isRead: true / false / null, // (optional property, if missing: show all) 
}

_createEmails()

async function query(filterBy, folder) {
    let emails = await storageService.query(STORAGE_KEY);
    let { status, subject = '', isRead } = filterBy
    if (filterBy.isRead !== 'All') {
        emails = emails.filter(email =>
            email.isRead === isRead)
    }
    if (folder === 'star') {
        emails = emails.filter(email =>
            email.isStarred === true);
    }
    if (folder === 'trash') {
        emails = emails.filter(email =>
            email.removedAt !== '');
    }
    if (folder === 'inbox') {
        emails = emails.filter(email =>
            (email.removedAt === '' && email.from !== loggedinUser.email));
    }
    if (folder === 'sent') {
        console.log("sent")
        emails = emails.filter(email =>
            email.from === loggedinUser.email);
    }

    if (subject) {
        emails = emails.filter(email =>
            email.subject.toLowerCase().includes(subject.toLowerCase())
        );

    }
    return emails;
}
function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function createEmail(id = '', subject = '', body = '', isRead, isStarred, sentAt = '', removedAt = '', from = '', to = '') {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt,
        from,
        to
    }
}

function getDefaultFilter() {
    return {
        status: 'inbox/sent/star/trash',
        subject: '',
        isRead: "All",
    }
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}





function _createEmails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {
                id: utilService.makeId(),
                subject: "ahello_me",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(170274327999),
                removedAt: '',
                from: loggedinUser.email,
                to: 'moria0525@gmail.com'
            },
            {
                id: utilService.makeId(),
                subject: "bhi2",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(190274527000),
                removedAt: '',
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "cgood morning3",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(107274527543),
                removedAt: '',
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "dgood day4",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(170574527123),
                removedAt: '',
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "ehello5",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(171274527111),
                removedAt: '',
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "hi6",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(170274527543),
                removedAt: '',
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "good morning7",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(570274527543),
                removedAt: '',
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "good day8",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(970274527543),
                removedAt: '',
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }


}

async function onRemoveEmail(email, folder) {
    try {
        email.isRead = !email.isRead
        onUpdateDelete(email)
        if (folder === 'trash') {
            await remove(email.id)
        }
        // navigate('/email/:folder')
    } catch (error) {
        console.log('error:', error)
    }
}

async function onUpdateDelete(email) {
    try {
        email.removedAt = Date.now()
        await save(email)
    } catch (error) {
        console.log("error:", error)
    }
}


