//home work3
//MODAL WINDOW
const btnGet = document.querySelector('#btn-get');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal_close');
const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflowY = 'hidden';
}
const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflowY = '';
}
btnGet.onclick = () => openModal();

modalClose.onclick = () => closeModal();
modal.onclick = (e) => {
    if (e.target === modal){
        closeModal()
    }
};

let switcher= true
window.onscroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight
    const scrollHeight = document.body.scrollHeight
    if (scrollPosition >= scrollHeight && switcher === true) {
        openModal()
        switcher = false
    }
    window.removeEventListener = () => openModal()
}
setTimeout(() => openModal(), 10000)