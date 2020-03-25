

document.onkeydown = interceptKeys;

document.addEventListener('copy', function(e) {
    e.clipboardData.setData('text/plain', '');
    e.clipboardData.setData('text/html', '');
    e.preventDefault();
});

document.addEventListener('paste', function(e) {
    e.preventDefault();
});

function interceptKeys(evt) {



    evt = evt||window.event // IE support
    var c = evt.keyCode
    var ctrlDown = evt.ctrlKey||evt.metaKey // Mac support

    // Check for Alt+Gr (http://en.wikipedia.org/wiki/AltGr_key)
    if (ctrlDown && evt.altKey) return true

    // Check for ctrl+c, v and x
    else if (ctrlDown && c==67) return O365_Copy(); // c
    else if (ctrlDown && c==86) return O365_Paste(); // v
    else if (ctrlDown && c==88) return O365_Cut(); // x

    // Otherwise allow
    return true
}

function O365_Copy(){
    
    var copiedData = document.getSelection().toString();
    console.log('copying ' + copiedData);
    chrome.runtime.sendMessage({cmd: 'copy', value: copiedData});

    return false;
}

function O365_Paste(){
    
    chrome.runtime.sendMessage({cmd: 'paste'}, function(value){
        console.log('pasting ' + value);
        document.execCommand('insertText', false, value);
    });
    
    return false;
}

function O365_Cut(){
    O365_Copy();
    document.execCommand('insertText', false, '');
    return false;
}