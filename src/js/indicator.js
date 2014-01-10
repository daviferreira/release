/*global console, module*/

function ReleaseIndicator(increaseRate) {
    'use strict';
    return this.init(increaseRate);
}

if (typeof module === 'object') {
    module.exports = ReleaseIndicator;
}

(function (window, document) {
    'use strict';

    ReleaseIndicator.prototype = {

        init: function init(increaseRate) {
            this.increaseRate = increaseRate;
            this.element = document.createElement('div');
            this.element.className = 'release-indicator';
            document.body.appendChild(this.element);
        },

        animate: function animate(e) {
            var height,
                width;
            height = (this.element.offsetHeight + this.increaseRate);
            width = (this.element.offsetWidth + this.increaseRate);
            this.element.style.width = width + 'px';
            this.element.style.height = height + 'px';
            this.element.style.top = e.pageY + 'px';
            this.element.style.left = e.pageX + 'px';
            this.element.style.marginTop = (-(height / 2)) + 'px';
            this.element.style.marginLeft = (-(width / 2)) + 'px';
        },

        reset: function reset() {
            this.element.style.width = '0';
            this.element.style.height = '0';
        }

    };

}(window, document));
