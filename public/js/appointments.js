"use strict";
const times = [];
window.onload = () => {
    times.length = 0;
    $('.btn').mousedown((event) => {
        let value = event.target.value;
        if (times.includes(value)) {
            const index = times.indexOf(value);
            if (index > -1) { // only splice array when item is found
                times.splice(index, 1); // 2nd parameter means remove one item only
            }
            event.target.classList.remove('btn-primary');
            event.target.classList.add('btn-outline-secondary');
        } else {
            if (value !== '') {
                times.push(value);
                event.target.classList.remove('btn-outline-secondary');
                event.target.classList.add('btn-primary');
            }
        }
    });

    $('#date').change(() => {
        let date = $('#date').val();
        get('/appointments', {date: date});
    });

    $('#submit').click((event) => {
        event.preventDefault();
        let date = $('#date').val();

        if (date === '') {
            alert('❌ Please select a date');
            return;
        }

        if (times.length === 0) {
            alert('❌ Please select at least one time slot');
            return;
        }


        post('/appointments', {data: JSON.stringify(times.map(time => ({date, time})))});
    });
}
