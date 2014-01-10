/*global console, module, ReleaseIndicator*/

function Release(elements, options) {
    'use strict';
    return this.init(elements, options);
}

if (typeof module === 'object') {
    module.exports = Release;
}

(function (window, document) {
    'use strict';

    function extend(b, a) {
        var prop;
        if (b === undefined) {
            return a;
        }
        for (prop in a) {
            if (a.hasOwnProperty(prop) && b.hasOwnProperty(prop) === false) {
                b[prop] = a[prop];
            }
        }
        return b;
    }

    Release.prototype = {

        defaults: {
            animationTime: 300,
            increaseRate: 15,
            onRelease: function () {
                console.log('released!');
            },
            releaseTime: 3000
        },

        init: function init(elements, options) {
            this.options = extend(options, this.defaults);
            this.locked = false;
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

        // TODO: break method
        bindRelease: function bindRelease(index) {
            var timer,
                seconds = 0,
                self = this,
                resetTimer = function resetTimer() {
                    clearInterval(timer);
                    seconds = 0;
                };

            this.elements[index].addEventListener('mousedown', function(e) {
                if (self.locked) {
                    return;
                }
                timer = setInterval(function () {
                    seconds += self.options.animationTime;
                    if (seconds >= self.options.releaseTime) {
                        resetTimer();
                        self.locked = true;
                        self.options.onRelease();
                    } else {
                        if (self.indicator === undefined) {
                            self.indicator = new ReleaseIndicator(self.options.increaseRate);
                        } else {
                            self.indicator.animate(e);
                        }
                    }
                }, self.options.animationTime);
            });

            this.elements[index].addEventListener('mouseup', function() {
                if (self.locked) {
                    return;
                }
                resetTimer();
                self.indicator.reset();
            });
        }
    };

}(window, document));
