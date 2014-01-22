function fireEvent(element, event, keyCode, ctrlKey) {
    'use strict';
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, true, true);
    if (keyCode) {
        evt.keyCode = keyCode;
    }
    if (ctrlKey) {
        evt.ctrlKey = true;
    }
    return !element.dispatchEvent(evt);
}
