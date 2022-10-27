const socket = io();

// Elements
const $messageForm = document.getElementById('form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.getElementById('send-location');

socket.on('message', (m) => { console.log(m) });

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Disable
    $messageFormButton.setAttribute('disabled', 'disabled');
    
    const message = e.target.elements.message.value;
    
    socket.emit('sendMessage', message, (error) => {
        // Enable
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            return console.log(error);
        }

        console.log('Message delivered!');
    });
});

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    // Disable
    $sendLocationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit('sendLocation', { latitude, longitude }, () => {
            console.log('Location shared!');
            $sendLocationButton.removeAttribute('disabled');
        });
    })
});