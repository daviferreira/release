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

        init: function init(elements, options) {
            this.options = options;
            if (typeof elements === 'string') {
                this.elements = document.querySelectorAll(elements);
            } else {
                this.elements = elements;
            }
            this.initElements();
        },

        initElements: function initElements() {
            var i;
            for (i = 0; i < this.elements.length; i += 1) {
                this.bindRelease(i);
            }
        },

        bindRelease: function bindRelease(index) {
            var timer,
                seconds = 0,
                self = this;

            this.elements[index].addEventListener('mousedown', function() {
                timer = setInterval(function () {
                    seconds += self.options.animationTime;
                    console.log(seconds);
                    if (seconds >= self.options.releaseTime) {
                        clearInterval(timer);
                        seconds = 0;
                        console.log('pop');
                    }
                }, self.options.animationTime);
            });

            this.elements[index].addEventListener('mouseup', function() {
                clearInterval(timer);
                seconds = 0;
            });
        }

    };

}(window, document));
