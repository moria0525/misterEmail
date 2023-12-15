import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    query,
    save,
    remove,
    getById,
    createemail,
    getDefaultFilter
}

const STORAGE_KEY = 'emails'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}


_createemails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        let { body = '' } = filterBy
        const regexModelTerm = new RegExp(body, 'i')
        emails = emails.filter(email =>
            regexModelTerm.test(email.body)
        )
    }
    return emails
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

function createemail(id = '', subject = '', body = '', isRead, isStarred, sentAt = '', from = '', to = '') {
    return {
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        removedAt : null, 
        from,
        to
    }
}

function getDefaultFilter() {
    return {
        body: '',
        isRead: false,
    }
}

function _createemails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id : utilService.makeId(), subject: 'New Mail', body: "hi, ", from: 'moria05@gmail.com', sentAt: 'Dec 3', isRead:false, isStarred:false},
            { id : utilService.makeId(), subject: 'My Work', body: "hgbhnb", from: 'moria02@walla.com', sentAt: 'Dec 2', isRead:false, isStarred:false },
            { id : utilService.makeId(), subject: 'HomeWork', body: "gbynh", from: 'moria332@gmail.com', sentAt: 'Dec 1', isRead:false, isStarred:false },
            { id : utilService.makeId(), subject: 'My Week', body: "hi, how are you today?", from: 'moria392@gmail.com', sentAt: '2022', isRead:false , isStarred:false}
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




