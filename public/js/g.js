"use strict";

const licenseRegex = /^\d{4}-\d{4}$/;

const validateForm = () => {
    const licenseNo = $("#license").val();

    // validate the entries are not empty and display error message if they are
    if (licenseNo === "") {
        alert("❌ License number is required.");
        return false;
    }

    // validate the license number is in the correct format
    if (!licenseRegex.test(licenseNo)) {
        alert("❌ License number must be in the format ####-####");
        return false;
    }

    return true;
}

const validateUpdateForm = () => {
    const make = $("#make").val();
    const model = $("#model").val();
    const year = $("#year").val();
    const color = $("#color").val();
    const plateNo = $("#plate").val();

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
    $("#myForm").submit(validateForm);
    $("#myUpdateForm").submit(validateUpdateForm);
}