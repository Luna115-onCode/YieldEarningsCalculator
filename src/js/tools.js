export function getNumberValue(id) {
    return parseFloat(document.getElementById(id).value);
}

export function toggleModal(id) {
    document.getElementById(id).classList.toggle('show');
}

export function setModalText(text, id) {
    document.getElementById(id).innerHTML = text;
}