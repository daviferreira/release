# Release

Release is a JavaScript plugin that enables the execution of an action after the user keeps the mouse pressed for a custom amount of time.

[![Build
Status](https://travis-ci.org/daviferreira/release.png)](https://travis-ci.org/daviferreira/release)

## Demos

* __[Menu](http://www.daviferreira.com/release/demo/menu.html)__
* __[Press to delete](http://www.daviferreira.com/release/demo/delete.html)__
* __[Shopping Cart](http://www.daviferreira.com/release/demo/shopping-cart.html)__

## Basic usage

First you need to attach release stylesheet and javascript files:

```html
<link rel="stylesheet" href="css/release.css">
<script src="js/release.js"></script>
```

Now you can instantiate a Release object by using the following code:

```html
<script>var release = new Release('.release', {onRelease: myFunction()});</script>
```

With the above code, all elements with the _release_ class will receive a _mouseup_ event that will execute _myFunction()__ after 3 seconds (default value).

## Initialization options

```javascript
defaults: {
    animationTime: 200,
    increaseRate: 15,
    onRelease: '',
    releaseTime: 3000
}
```

* __animationTime__: defines the interval to animate the indicator. It must be the same as the css transition timing value. Default: 200
* __increaseRate__: pixel value that will be added to the indicator dimensions when the user is pressing the mouse. Default: 15
* __onRelease__: callback to be executed when _releaseTime_ is reached. Default: none (it will just reset the indicator)
* __releaseTime__: time limit until the indicator is released. Default: 3000

## Development

Release development tasks are managed by Grunt. To install all the necessary packages, just invoke:

```bash
npm install
```

These are the available grunt tasks:

* __js__: runs jslint and jasmine tests and creates minified and concatenated versions of the script;
* __css__: runs compass and csslint
* __test__: runs jasmine tests, jslint and csslint
* __watch__: watch for modifications on script/scss files

The source files are located inside the __src__ directory. Release stylesheet was created using sass/compass, so make sure you have the __compass gem__ installed on your system.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Test your changes to the best of your ability.
4. Update the documentation to reflect your changes if they add or changes current functionality.
5. Commit your changes (`git commit -am 'Added some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create new Pull Request

## License

"THE BEER-WARE LICENSE" (Revision 42):

As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.
