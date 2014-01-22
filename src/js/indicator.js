/*global console, module*/

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
