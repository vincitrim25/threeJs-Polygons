const selectGeometry = (g) => {
    for(let el of document.getElementsByClassName('navbar')[0].children){
        el.id != g ? el.classList.remove('active') : el.classList.add('active');
    }
    selectedGeometry = g;
    change = true;
}