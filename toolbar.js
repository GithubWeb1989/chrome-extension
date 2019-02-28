
$(document).ready(function () {
    
    let name = 'Tester';
    let product = 'Test';

    $('#msg').text(`Hey, ${name}, Is this website related to your search for ${product}?`);
    $('button').click(function () {
        parent.postMessage({type: 'isTabProcessed', isRelated: this.value}, "*");
    });
});
