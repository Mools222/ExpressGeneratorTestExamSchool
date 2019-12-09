function tickTock() {
    document.getElementById('dateTime').innerText = new Date().toLocaleString("da-DK");
}

setInterval(tickTock, 1000);