import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createEmail,
    getDefaultFilter,
    getFilterFromParams
}

const STORAGE_KEY = 'emails'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const filterBy = {
    status: 'inbox/sent/star/trash',
    txt: 'puki', // no need to support complex text search 
    isRead: true / false / null, // (optional property, if missing: show all) 
}

_createEmails()

async function query(filterBy,folder) {
    let emails = await storageService.query(STORAGE_KEY);
    let { status, body = '', isRead } = filterBy
    if (filterBy.isRead !== 'All') {
        emails = emails.filter(email=>
            email.isRead === isRead)
    }
    if (folder === 'star') {
        emails = emails.filter(email => 
            email.isStarred === true);   
    }
    if (folder === 'trash') {
        emails = emails.filter(email => 
            email.removedAt === true);
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

function createEmail(id = '', subject = '', body = '', isRead, isStarred, sentAt = '', from = '', to = '') {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt: null,
        from,
        to
    }
}

function getDefaultFilter() {
    return {
        status:'inbox/sent/star/trash',
        body: '',
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
                subject: "hello",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(1702745276),
                removedAt: null,
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "hi",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(170274527543),
                removedAt: null,
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "good morning",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(170274527543),
                removedAt: null,
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "good day",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(999274527543),
                removedAt: null,
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "hello",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(1702745276),
                removedAt: null,
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "hi",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(170274527543),
                removedAt: null,
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "good morning",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(170274527543),
                removedAt: null,
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            },
            {
                id: utilService.makeId(),
                subject: "good day",
                body: utilService.makeLorem(),
                isRead: false,
                isStarred: false,
                sentAt: utilService.convertDate(999274527543),
                removedAt: null,
                from: "moria0525@gmail.com",
                to: loggedinUser.email
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}