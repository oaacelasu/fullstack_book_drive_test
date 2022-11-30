



window.onload = () => {

    $('#testType').change(() => {
        let type = $('#testType').val();
        get('/examiner', {type});
    });
}