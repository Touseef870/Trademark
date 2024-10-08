function openModal(button) {
    const title = button.getAttribute('data-title');
    const price = button.getAttribute('data-price');
    document.getElementById('modal-title').innerHTML = title + ' <br>in Just <span>' + price + '</span>';
    document.getElementById('popupform_cr').style.display = 'block';
}

function closeModal() {
    document.getElementById('popupform_cr').style.display = 'none';
}

document.getElementById('formClose').addEventListener('click', function() {
    closeModal();
});

window.onclick = function(event) {
    const modal = document.getElementById('popupform_cr');
    if (event.target === modal) {
        closeModal();
    }
};

window.onkeydown = function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
};

 