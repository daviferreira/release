/*global describe, it, expect, Release, console, beforeEach, afterEach,
         jasmine, fireEvent, ReleaseIndicator, spyOn*/

describe('Indicator TestCase', function () {
    'use strict';

    beforeEach(function () {
        this.release = new Release('.release');
    });

    afterEach(function () {
        this.release = undefined;
    });

    describe('Init', function () {
        it('should have a default set of options', function () {
            expect(this.release.options).toEqual({
                animationTime: 200,
                increaseRate: 15,
                onRelease: '',
                releaseTime: 3000
            });
        });

        it('should accept custom options', function () {
            var customOptions = {
                increaseRate: 30,
                onRelease: function () {
                    console.log('release');
                }
            };
            this.release = new Release('.release', customOptions);
            expect(this.release.options).toEqual(customOptions);
        });

        it('should accept an array of HTML nodes', function () {
            var div = document.body.appendChild(document.createElement('div'));
            this.release = new Release([div]);
            expect(this.release.elements[0]).toBe(div);
            document.body.removeChild(div);
        });

        it('should accept a selector', function () {
            var div = document.createElement('div');
            div.className = 'release';
            document.body.appendChild(div);
            this.release = new Release('.release');
            expect(this.release.elements[0]).toBe(div);
            document.body.removeChild(div);
        });
    });

    describe('Event binding', function () {
        beforeEach(function () {
            jasmine.Clock.useMock();
            var div = document.createElement('div');
            div.className = 'release';
            document.body.appendChild(div);
            this.release = new Release('.release');
        });

        afterEach(function () {
            clearInterval(this.release.timer);
            this.release = undefined;
        });

        describe('mouseup', function () {
            it('should create the indicator on mousedown when it doest not exists', function () {
                spyOn(ReleaseIndicator.prototype, 'init');
                fireEvent(this.release.elements[0], 'mousedown');
                jasmine.Clock.tick(this.release.options.animationTime + 1);
                expect(ReleaseIndicator.prototype.init).toHaveBeenCalledWith(this.release.options.increaseRate,
                                                                             this.release.options.animationTime);
            });

            it('shoud animate the indicator on mousedown', function () {
                spyOn(ReleaseIndicator.prototype, 'animate');
                fireEvent(this.release.elements[0], 'mousedown');
                jasmine.Clock.tick((this.release.options.animationTime * 2) + 1);
                expect(this.release.indicator.animate).toHaveBeenCalled();
            });

            it('should lock the indicator when releaseTime is reached', function () {
                spyOn(Release.prototype, 'lock');
                fireEvent(this.release.elements[0], 'mousedown');
                jasmine.Clock.tick(this.release.options.releaseTime + 1);
                expect(this.release.lock).toHaveBeenCalled();
            });

            it('should call the default release method when a callback is not defined', function () {
                spyOn(Release.prototype, 'release');
                fireEvent(this.release.elements[0], 'mousedown');
                jasmine.Clock.tick(this.release.options.releaseTime + 1);
                expect(this.release.release).toHaveBeenCalled();
            });

            it('should execute the onRelease callback when releaseTime is reached', function () {
                var callback = jasmine.createSpy();
                this.release = new Release('.release', {
                    onRelease: callback
                });
                fireEvent(this.release.elements[0], 'mousedown');
                jasmine.Clock.tick(this.release.options.releaseTime + 1);
                expect(callback).toHaveBeenCalled();
            });

            it('should do nothing when indicator is locked', function () {
                this.release.isLocked = true;
                spyOn(ReleaseIndicator.prototype, 'init');
                fireEvent(this.release.elements[0], 'mousedown');
                jasmine.Clock.tick(this.release.options.animationTime + 1);
                expect(this.release.indicator).toBe(undefined);
            });
        });

        describe('mousedown', function () {
            it('should do nothing when indicator is locked', function () {
                fireEvent(this.release.elements[0], 'mousedown');
                jasmine.Clock.tick(this.release.options.animationTime + 1);
                clearInterval(this.release.timer);
                this.release.isLocked = true;
                spyOn(this.release.indicator, 'reset');
                fireEvent(this.release.elements[0], 'mouseup');
                expect(this.release.indicator.reset).not.toHaveBeenCalled();
            });

            it('should reset the indicator', function () {
                fireEvent(this.release.elements[0], 'mousedown');
                jasmine.Clock.tick(this.release.options.animationTime + 1);
                clearInterval(this.release.timer);
                spyOn(this.release.indicator, 'reset');
                fireEvent(this.release.elements[0], 'mouseup');
                expect(this.release.indicator.reset).toHaveBeenCalled();
            });
        });
    });
});
