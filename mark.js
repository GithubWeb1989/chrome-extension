let bg = chrome.extension.getBackgroundPage();

// chrome 49+
let recordId = new URL(document.location.href).searchParams.get('recordId');
let url = new URL(document.location.href).searchParams.get('url');
$('#msg').html(`So NAME, how helpful was <strong>${url}</strong> in your search for PRODUCT?`);

// $(document).on('input', '#rate', function () {
//     $('#rateNum').val(this.value);
// });

// $('#rate').change(function () {
//     // alert(2);
//     let m = this.value;
//     console.log(recordId);
//     console.log(m);
//     $.post("https://api.bossprojects.com.au/api/setmark", JSON.stringify({
//         id: recordId,
//         mark: m
//     }), function (data) {
//         window.close();
//     });
// });

function showmins() {
    var minutes = 1000 * 60;

    var x = new Date()
    //var x1=x.toUTCString();// changing the display to UTC string
    var x1 = x.getTime()/minutes;
    // alert(x1);
    return x1;
}

$(document).ready(function(){
    $('input[type="radio"]').click(function(){
        let m = $(this).val();
        var endtime = showmins();

        $.post("https://api.bossprojects.com.au/api/setmark", JSON.stringify({
        id: recordId,
        mark: m,
        endminute: endtime
        }), function (data) {
            window.close();
        });
    });
});