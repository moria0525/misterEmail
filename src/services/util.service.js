import { emailService } from "./email.service";

export const utilService = {
    makeId,
    makeLorem,
    saveToStorage,
    loadFromStorage,
    convertDate,
}

function makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value)
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value)
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function convertDate(date) {
    const time = parseInt(date, 10)
    const dateConvert = new Date(time)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateConvert)
    return formattedDate
}

