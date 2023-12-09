import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const Emailservice = {
    query,
    save,
    remove,
    getById,
    createemail,
    getDefaultFilter
}

const STORAGE_KEY = 'emails'

_createemails()

async function query(filterBy) {
    let emails = await storageService.query(STORAGE_KEY)
    // if (filterBy) {
    //     let { minBatteryStatus, model = '' } = filterBy
    //     minBatteryStatus = minBatteryStatus || 0
    //     const regexModelTerm = new RegExp(model, 'i')
    //     emails = emails.filter(email =>
    //         regexModelTerm.test(email.model) &&
    //         email.batteryStatus > minBatteryStatus
    //     )
    // }
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

function createemail(id = '', subject = '', body = '', isRead = false, isStarred = false, sentAt = '', from ='', to ='') {
    return {
        id,
        subject,
        body,
        isRead,
        isStarred,
        sentAt,
        //removedAt : null, 
        from,
        to
    }
}

function getDefaultFilter() {
    return {
        status: '',
        txt: 0,
        isRead: true,
    }
}

function _createemails() {
    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            {subject: 'New Mail', from: 'moria05@gmail.com', sentAt:'Dec 3' },
            {subject: 'My Work', from: 'moria02@walla.com', sentAt: 'Dec 2' },
            {subject: 'HomeWork', from: 'moria332@gmail.com', sentAt:'Dec 1' },
            {subject: 'My Week', from: 'moria392@gmail.com', sentAt: '2022' }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




