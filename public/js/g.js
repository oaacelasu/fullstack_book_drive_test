"use strict";

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
    $("#gForm").submit(validateForm);
}