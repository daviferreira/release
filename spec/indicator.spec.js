/*global describe, it, expect, ReleaseIndicator, console, beforeEach, afterEach,
         jasmine*/

describe('Indicator TestCase', function () {
    'use strict';

    beforeEach(function () {
        this.indicator = new ReleaseIndicator(15, 3000);
    });

    afterEach(function () {
        document.body.removeChild(document.body.querySelector('div.release-indicator'));
        this.indicator = undefined;
    });

    describe('Init', function () {
        it('should set the indicator increaseRate', function () {
            expect(this.indicator.increaseRate).toBe(15);
        });

        it('should set the indicator animationTime', function () {
            expect(this.indicator.animationTime).toBe(3000);
        });

        it('should create the indicator element', function () {
            expect(document.body.querySelector('div.release-indicator')).toBeTruthy();
        });
    });

    describe('Animate', function () {
        it('should position the indicator according to cursor position', function () {
            this.indicator.animate({pageY: 60, pageX: 20});
            expect(this.indicator.element.style.top).toBe('60px');
            expect(this.indicator.element.style.left).toBe('20px');
        });

        it('should add the release-indicator-active class when indicator is not active', function () {
            jasmine.Clock.useMock();
            this.indicator.animate({pageY: 10, pageX: 40});
            jasmine.Clock.tick(this.indicator.animationTime + 1);
            expect(this.indicator.element.className).toContain('release-indicator-active');
        });

        it('should set element dimensions when indicator is active', function () {
            this.indicator.isActive = true;
            this.indicator.animate({pageY: 10, pageX: 40});
            expect(this.indicator.element.style.width).toBe(this.indicator.increaseRate + 'px');
            expect(this.indicator.element.style.height).toBe(this.indicator.increaseRate + 'px');
        });
    });

    describe('Reset', function () {
        it('should clear element position and dimension', function () {
            this.indicator.isActive = true;
            this.indicator.animate({pageY: 10, pageX: 40});
            this.indicator.reset();
            expect(this.indicator.element.style.width).toBe('0px');
            expect(this.indicator.element.style.height).toBe('0px');
            expect(this.indicator.element.style.marginTop).toBe('');
            expect(this.indicator.element.style.marginLeft).toBe('');
            expect(this.indicator.element.style.top).toBe('');
            expect(this.indicator.element.style.left).toBe('');
        });

        it('should remove the release-indicator-active class', function () {
            this.indicator.element.classList.add('release-indicator-active');
            this.indicator.reset();
            expect(this.indicator.element.className).not.toContain('release-indicator-active');
        });

        it('should set the indicator as inactive', function () {
            this.indicator.isActive = true;
            this.indicator.reset();
            expect(this.indicator.isActive).toBe(false);
        });
    });
});
