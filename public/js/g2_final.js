"use strict";
var time = ""
var button

window.onload = () => {
    time = "";

    $('.btn').mousedown((event) => {
        let value = event.target.value;
        if (time === value) {
            time = "";
            button.classList.remove('btn-primary');
            button.classList.add('btn-outline-primary');
            button = null
        } else {
            if (value !== '') {
                button?.classList.remove('btn-primary');
                button?.classList.add('btn-outline-primary');
                time = value
                button = event.target
                button.classList.remove('btn-outline-primary');
                button.classList.add('btn-primary');
            }
        }
    });

    $('#date').change(() => {
        let date = $('#date').val();
        get('/g2', {date: date});
    });

    $('#submit').click((event) => {
        event.preventDefault();
        let date = $('#date').val();

        if (!time) {
            alert('❌ Please select the time slot');
            return;
        }

        post('/g2/appointment', {data: JSON.stringify({date, time})});
    });
}
