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
            {subject: 'hello', from: 'moria@', sentAt: '21-11-23' },
            {subject: 'subject', from: 'aaa@', sentAt: '21-11-23' },
            {subject: 'bye', from: '@bbb', sentAt: '21-11-23' },
            {subject: 'info', from: '@ccc', sentAt: '21-11-23' }
        ]
        utilService.saveToStorage(STORAGE_KEY, emails)
    }
}




