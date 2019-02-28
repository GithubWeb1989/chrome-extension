let repositionFixedTopElements = function (height) {
    let items;
    if (items == null) {
        items = ($('body *')).filter(function () {
            let style = window.getComputedStyle(this);
            return style.position === 'fixed' &&
                style.top === '0px' &&
                this.id !== 'market-research-tool';
        });
    }
    return items.each(function () {
        return this.style.setProperty('top', "" + height + "px", 'important');
    });
};

let repositionFixedTopElementsBack = function (height) {
    let items;
    if (items == null) {
        items = ($('body *')).filter(function () {
            let style = window.getComputedStyle(this);
            return style.position === 'fixed' && style.top === height + 'px' && this.id !== 'market-research-tool';
        });
    }
    return items.each(function () {
        return this.style.setProperty('top', "0", 'important');
    });
};

function createToolbar() {

    $(document).ready(function () {
        repositionFixedTopElements(46);
    });
    let iframe = document.createElement("iframe");
    iframe.id = 'market-research-tool';
    iframe.className = 'market-research-tool';
    iframe.frameBorder = 0;
    iframe.scrolling = 'no';
    iframe.src = chrome.extension.getURL('toolbar.html');

    // Сдвигает контент страницы вниз
    $(document.body).addClass('market-research-tool-margin');
    repositionFixedTopElements(46);
    document.body.appendChild(iframe);
}

function removeToolbar() {
    $('iframe#market-research-tool').remove();
    repositionFixedTopElementsBack(46);
    $(document.body).removeClass('market-research-tool-margin');
}

function createMark() {
    $(document).ready(function () {
        repositionFixedTopElements(46);
    });
    let iframe = document.createElement("iframe");
    iframe.id = 'market-research-tool';
    iframe.className = 'market-research-tool';
    iframe.frameBorder = 0;
    iframe.scrolling = 'no';
    iframe.src = chrome.extension.getURL('mark.html');

    // Сдвигает контент страницы вниз
    $(document.body).addClass('market-research-tool-margin');
    repositionFixedTopElements(46);
    document.body.appendChild(iframe);
}

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.id) {
        case 'REMOVE_TOOLBAR':
            removeToolbar();
            break;
        default:
            break;
    }
});

function showmins() {
    var minutes = 1000 * 60;

    var x = new Date()
    //var x1=x.toUTCString();// changing the display to UTC string
    var x1 = x.getTime()/minutes;
    // alert(x1);
    return x1;
}

window.addEventListener("message", function (e) {
    if (e.data.type === 'isTabProcessed') {

        if (e.data.isRelated === '0') {
            sessionStorage.isTabProcessed = true;
            removeToolbar();
            return;
        }
        // if (e.data.isRelated === '1') {
        //     removeToolbar();
        //     createMark();
        // }
        let url = document.location.href;
        var yesminutes = showmins();

        // $.post("http://localhost:8000/api/onpageview", JSON.stringify({
        $.post("https://api.bossprojects.com.au/api/onpageview", JSON.stringify({
            "url": url,
            "productname": "someproduct",
            "username": "Tester",
            "isrelated": e.data.isRelated,
            "startminute": yesminutes
        }), function (data) {
            // alert("Data Saved: " + JSON.stringify(data));
            let d = JSON.parse(data);
            chrome.runtime.sendMessage({id: 'ADD_ID', recordId: d.id, url: d.url}, function (response) {
                removeToolbar();
            });
        });
        sessionStorage.isTabProcessed = true;
    }
}, false);

if (!sessionStorage.isTabProcessed) {
    createToolbar();
}
