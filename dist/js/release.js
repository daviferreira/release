function ReleaseIndicator(increaseRate, animationTime) {
    'use strict';
    return this.init(increaseRate, animationTime);
}

(function (window, document) {
    'use strict';

    ReleaseIndicator.prototype = {

        init: function init(increaseRate, animationTime) {
            this.increaseRate = increaseRate;
            this.animationTime = animationTime;
            this.element = document.createElement('div');
            this.element.className = 'release-indicator';
            this.isActive = false;
            document.body.appendChild(this.element);
        },

        animate: function animate(e) {
            var height,
                width,
                self;
            height = (this.element.offsetHeight + this.increaseRate);
            width = (this.element.offsetWidth + this.increaseRate);
            this.element.style.top = e.pageY + 'px';
            this.element.style.left = e.pageX + 'px';
            if (!this.isActive) {
                self = this;
                this.isActive = true;
                setTimeout(function () {
                    self.element.classList.add('release-indicator-active');
                }, this.animationTime);
            } else {
                this.element.style.width = width + 'px';
                this.element.style.height = height + 'px';
                this.element.style.marginTop = (-(height / 2)) + 'px';
                this.element.style.marginLeft = (-(width / 2)) + 'px';
            }
        },

        reset: function reset() {
            this.isActive = false;
            if (this.element === undefined) {
                return;
            }
            this.element.style.width = '0';
            this.element.style.height = '0';
            this.element.style.marginTop = '';
            this.element.style.marginLeft = '';
            this.element.style.top = '';
            this.element.style.left = '';
            this.element.classList.remove('release-indicator-active');
        }

    };

}(window, document));

function Release(elements, options) {
    'use strict';
    return this.init(elements, options);
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
            animationTime: 200,
            increaseRate: 15,
            onRelease: '',
            releaseTime: 3000
        },

        init: function init(elements, options) {
            this.options = extend(options, this.defaults);
            this.isLocked = false;
            this.seconds = 0;
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
            var self = this,
                resetTimer = function resetTimer() {
                    clearInterval(self.timer);
                    self.seconds = 0;
                };

            this.elements[index].addEventListener('mousedown', function(e) {
                if (self.isLocked) {
                    return;
                }
                self.timer = setInterval(function () {
                    self.seconds += self.options.animationTime;
                    if (self.seconds >= self.options.releaseTime) {
                        resetTimer();
                        self.lock();
                        if (typeof self.options.onRelease === 'function') {
                            self.options.onRelease(self.elements[index]);
                        } else {
                            self.release();
                        }
                    } else {
                        if (self.indicator === undefined) {
                            self.indicator = new ReleaseIndicator(self.options.increaseRate,
                                                                  self.options.animationTime);
                        } else {
                            self.indicator.animate(e);
                        }
                    }
                }, self.options.animationTime);
            });

            document.body.addEventListener('mouseup', function() {
                if (self.isLocked) {
                    return;
                }
                resetTimer();
                if (self.indicator) {
                    self.indicator.reset();
                }
            });
        },

        release: function release() {
            this.unlock();
            this.seconds = 0;
            this.indicator.reset();
        },

        lock: function lock() {
            this.isLocked = true;
        },

        unlock: function unlock() {
            this.isLocked = false;
        }
    };

}(window, document));
