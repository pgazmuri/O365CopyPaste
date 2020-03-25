

chrome.browserAction.disable();

// listen for sendMessage() from content script
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if(request.cmd === 'copy'){
            window.sessionStorage.setItem('ClipBoard', request.value );
        }

        if(request.cmd === 'paste'){
            var data = window.sessionStorage.getItem('ClipBoard');
            sendResponse(data);
        }
    });

    

    