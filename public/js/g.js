"use strict";
var time = ""
var button

const validateForm = () => {
    const make = $("#make").val();
    const model = $("#model").val();
    const year = $("#year").val();
    const color = $("#color").val();
    const plateNo = $("#plateNo").val();

    // validate the entries are not empty and display error message if they form is visible
    if (make === "" || model === "" || year === "" || color === "" || plateNo === "") {
        let error = "";
        if (make === "") {
            error += "❌ Make is required.\n";
        }
        if (model === "") {
            error += "❌ Model is required.\n";
        }
        if (year === "") {
            error += "❌ Year is required.\n";
        }
        if (color === "") {
            error += "❌ Color is required.\n";
        }
        if (plateNo === "") {
            error += "❌ Plate number is required.\n";
        }
        alert(error);
        return false;
    }

    return true;
}

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
        get('/g', {date: date});
    });


    $("#gForm").submit(validateForm);

    $('#submit').click((event) => {
        event.preventDefault();
        let date = $('#date').val();

        if(!validateForm()) {
            return
        }

        if (!time) {
            alert('❌ Please select the time slot');
            return;
        }

        post('/g/appointment', {data: JSON.stringify({date, time})});
    });
}