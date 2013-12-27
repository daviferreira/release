/*global console, module*/

function Release(elements, options) {
    'use strict';
    return this.init(elements, options);
}

if (typeof module === 'object') {
    module.exports = Release;
}

(function (window, document) {
    'use strict';


    Release.prototype = {
        init: function init() {
            return;
        }
    };


}(window, document));
