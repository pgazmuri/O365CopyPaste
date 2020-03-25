

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
    else if (ctrlDown && c==67) return CVSCVX_Copy(); // c
    else if (ctrlDown && c==86) return CVSCVX_Paste(); // v
    else if (ctrlDown && c==88) return CVSCVX_Cut(); // x

    // Otherwise allow
    return true
}

function CVSCVX_Copy(){
    
    var copiedData = document.getSelection().toString();
    console.log('copying ' + copiedData);
    window.localStorage.setItem('CVSCVX_ClipBoard', copiedData );
    return false;
}

function CVSCVX_Paste(){
    var copiedData = window.localStorage.getItem('CVSCVX_ClipBoard');
    console.log('pasting ' + copiedData);
    document.execCommand('insertText', false, copiedData);
    return false;
}

function CVSCVX_Cut(){
    CVSCVX_Copy();
    document.execCommand('insertText', false, '');
    return false;
}