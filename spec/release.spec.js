/*global describe, it, expect, Release, console, beforeEach, afterEach,
         jasmine*/

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
            expect(this.release.elements).toEqual([div]);
            document.body.removeChild(div);
        });

        it('should accept a selector', function () {
            var div = document.body.appendChild(document.createElement('div'));
            div.className = 'release';
            this.release = new Release('.release');
            expect(this.release.elements).toEqual([div]);
            document.body.removeChild(div);
        });
    });
});
