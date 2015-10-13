---
layout: post
title:  "Sass from Zero to Sixty"
excerpt: "Come take a look inside the new atlsass.com website.&nbsp;  Jason Reece will be discussing the basic setup of a new project, and then sharing some of the sassy @mixins, @functions, and effects used across the site.&nbsp;  There'll be something for all skill levels in this one!"
date: "2015-10-13"
time: "7:00pm"
rsvp_id: 225680054
---

## What is Sass
Sass is a stylesheet language that compiles into CSS.  It adds features that do not exist in the CSS language yet such as [variables](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#variables_), [mixins](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins), and [iteration](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#each-directive).  Sass has two [syntaxes](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax).

## Installing Sass
Our first step for brand new users will be to get Sass installed.  Open up the command line, and run:

{% highlight bash %}
gem install sass
{% endhighlight %}

If that fails, try running:

{% highlight bash %}
sudo gem install sass
{% endhighlight %}

Success? Check the version:

{% highlight bash %}
sass -v
{% endhighlight %}

Still having trouble?  Look [here](http://sass-lang.com/install).

## Compiling Sass
Now that we've got Sass installed, we'll need to look at how we want to compile our Sass code into CSS.

Sass can be compiled via the [command line](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#using_sass), or with a desktop application like [Codekit](https://incident57.com/codekit/), [Prepros](https://prepros.io/), or [Scout](https://mhs.github.io/scout-app/).

There are also a number of task runners that will compile your Sass for you like [Gulp](http://gulpjs.com/), [Grunt](http://gruntjs.com/), or [Broccoli](http://broccolijs.com/).

For the remainder of this post, we'll be using Gulp to compile our Sass (and do other CSS related things that will make our lives easier).

In fact, we are going to use Gulp to:

* Start our local server
* Watch for changes to our Sass files
* Check for errors
* Compile our Sass
* Add CSS3 [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix)
* Add minification
* Write our CSS file
* Reload the browser

## Installing Gulp.js
First, make sure that Node is installed:

{% highlight bash %}
node -v
{% endhighlight %}

If you need to install Node, you can do that [here](https://nodejs.org/en/download/).

Now, install Gulp.js:

{% highlight bash %}
npm install -g gulp
{% endhighlight %}

If that fails, try using sudo:

{% highlight bash %}
sudo npm install -g gulp
{% endhighlight %}

Next, we are ready to set up a new project.

## Download the template
First, download the [starter template](/assets/downloads/2015/10/starter-template.zip).  This template contains:

* _package.json_ - a list of npm packages that we will install
* _gulpfile.js_ - a list of tasks that we want Gulp to run for us
* _application.scss_ - our Sass file
* _index.html_ - our hello world web page

Now we just need to install all of the npm packages listed in our `package.json` file.

In the command line, navigate to the root of the starter template, and run:

{% highlight bash %}
npm install
{% endhighlight %}

That should have created a `node_modules` folder with all of the npm packages listed in the `package.json` file.

We've just installed:

* [browser-sync](https://www.npmjs.com/package/browser-sync) - our local server and live reload
* [gulp](https://www.npmjs.com/package/gulp) - the task runner
* [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - adds CSS3 vendor prefixes
* [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css) - minifies CSS, using clean-css
* [gulp-notify](https://www.npmjs.com/package/gulp-notify) - provides error messages
* [gulp-plumber](https://www.npmjs.com/package/gulp-plumber) - prevents pipe breaking caused by errors from gulp plugins
* [gulp-rename](https://www.npmjs.com/package/gulp-rename) - adds .min to file name
* [gulp-sass](https://www.npmjs.com/package/gulp-sass) - compiles our sass

Now we just need to run:

{% highlight bash %}
gulp
{% endhighlight %}

This will run our `default` task.  This task starts up our server local server, opens the browser, and begins watching our Sass file for any changes.

When there is a change in our Sass file, the `styles` task will:

* check our Sass for errors
* compile our Sass
* add the needed vendor prefixes
* minify our code.

Finally, the reload task will reload our browser.

For a look at exactly how this is set up, check out the project's `gulpfile.js`.

Breaking down the `gulpfile.js` is outside of the scope of this post, but if you'd like a good tutorial, check out Todd Gandee's post - [Journey into Gulp](https://www.bignerdranch.com/blog/journey-into-gulp/).

## Some additional Gulp tasks

A few other Gulp tasks that you might consider adding into your build process are:

* [gulp-hologram](https://www.npmjs.com/package/gulp-hologram) - a living style guide
* [gulp-sass-lint](https://www.npmjs.com/package/gulp-sass-lint) - jshint style linting for Sass
* [gulp-phantomcss](https://www.npmjs.com/package/gulp-phantomcss) - CSS regression testing


## Project organization with partials
We've got a pretty good build process set up, but instead of having one giant Sass file, lets look at how we can better organize our code using [Sass partials](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials).

When Sass compiles, it will create a matching CSS file for any file with a `.scss` or `.sass` extension.  However, if we prefix our file names with an underscore, Sass will not create a matching CSS file.

So, `application.scss` will get a matching `application.css` file, but `_my-partial-file.scss` will not.

We can use this technique to create an organizational structure for our project.  We'll break our styles up into partial files, and then use `@import` to bring all of the partial files into the main `application.scss` file.

{% highlight scss %}
// in the application.scss file
@import 'my-partial-file-one';
@import 'my-partial-file-two';
// etc
{% endhighlight %}

## css-burrito
So, what should our structure look like?

I have written an open source Sass Template called [css-burrito](https://github.com/jasonreece/css-burrito) that will provide a very scalable Sass structure.  In addition, it will automate a few tasks for us like adding and removing partial files.

The template contains three directories and an `application.scss` file to `@import` all of the partial files.

{% highlight bash %}
libs/
  _library-variable-overrides.scss
  _normalize.scss

global/
  _settings.scss
  _utilities.scss
  _base.scss
  _layout.scss
  _skin.scss
  _typography.scss

modules/
  _modules.scss

application.scss
{% endhighlight %}

### libs

The _libs_ directory will house all third party library code.  Add libraries like Bootstrap, or Foundation, or Bourbon here.  By default, this folder contains:

* `_library-variable-overrides.scss` - override any third party library variables in this file.
* `_normalize.scss` - [Normalize v3.0.2](https://necolas.github.io/normalize.css/)

### global

The _global_ directory is where we will keep all of the utility code that will be used across the entire project.  It should be organized as follows:

* `_settings.scss` - global variables and maps
* `_utilities.scss` - global placeholders, extends, mixins, functions, and utility classes
* `_base.scss` - global defaults for base level tags like `<body>` or `<p>`
* `_layout.scss` - global layout styles like margin, padding, or floats
* `_skin.scss` - global skin styles like gradients, colors, and box-shadows
* `_typography.scss` - global typography classes

### modules

The modules directory will ultimately contain the majority of the code in your project.  You'll add new modules as needed based on the design.  This directory also contains a `_modules.scss` file, to `@import` all of the other modules into the `application.scss` file.

## css-burrito comes with superpowers!

If you want css-burrito to create files and `@import` them for you, you'll need to install it as a global [npm package](https://www.npmjs.com/package/css-burrito)

{% highlight bash %}
npm install -g css-burrito
{% endhighlight %}

Once installed, you can quickly add a new instance of the css-burrito template by navigating to the root of the project and running:

<!-- Once installed, css-burrito will add a new instance of itself whenever you want to create a new project. -->

{% highlight bash %}
burrito -n [folder-name] [file-name] [path-to-sass-directory]
{% endhighlight %}

This will create a new instance of the css-burrito template, and a `css-burrito-config.json` file.

Once the config has been created, you can update the modules directory in a number of ways.

Add new module partials to the modules directory:

{% highlight bash %}
burrito -m (file-name[s])
{% endhighlight %}

Remove module partials from the modules directory:

{% highlight bash %}
burrito -r (file-name[s])
{% endhighlight %}

And list the partials in the modules directory:

{% highlight bash %}
burrito -l
{% endhighlight %}

## css-burrito customization

If you want to rename any of the files, partials, or edit the structure of the template itself, you can make edits to the `css-burrito-config.json` file.  Once the config edits are in place you can generate a customized version of the template by running:

{% highlight bash %}
burrito -g
{% endhighlight %}

## Let's put this all together!

Ok, so now we have an awesome build process set up with Gulp, and we know how we want to organize our files.

Go ahead and download the [starter-template-with-css-burrito](/assets/downloads/2015/10/starter-template-with-css-burrito.zip).

The `gulpfile.js` has been updated to watch our new project.

## Sassy Patterns

Now that we're ready, we can finally begin to write some code!

Lets take a look at some useful patterns.

### Sass maps

I use [Sass maps](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) in all of my projects for two reasons.  First, it limits the number of global variable names in the project, and second, they can be iterated over with an `@each` loop.

To get something out of a map, you'll use the built in [`map-get()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_get-instance_method) function.  This takes two arguments, the name of the map, and the key that you want to get out.

<p class="sassmeister" data-gist-id="ca6d694592f0e5d85e93" data-height="480" data-theme="tomorrow-night-eighties"><a href="http://sassmeister.com/gist/ca6d694592f0e5d85e93">Play with this gist on SassMeister.</a></p>

### Custom functions
I am not a big fan of typing `map-get()` everytime I want to get something out of a map.  Instead, I like to create a function for each map to get things out for me.

Lets create our own custom function to use with the `$colors` map.  This new function uses the built in Sass function [`map-has-key()`](http://sass-lang.com/documentation/Sass/Script/Functions.html#map_has_key-instance_method), which takes in a map and a key, and returns true or false depending on if the key exists.

When we call the colors function, we pass in a key, in this case, the color that we want to get out.  If the key exists, our function will run a `map-get()` for us, otherwise, we log a warning and exit out of the function.

<p class="sassmeister" data-gist-id="200f3c2fb265d13e929b" data-height="580" data-theme="tomorrow-night-eighties"><a href="http://sassmeister.com/gist/200f3c2fb265d13e929b">Play with this gist on SassMeister.</a></p>

### @each loops
Finally, we can iterate over maps using an [`@each`](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#each-directive) loop.  Here, we are looping through the colors map, getting the `$color-name` and `$color-hex`, and creating a ruleset with that data.  We need to use [interpolation](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#interpolation_) to add the `$color-name`.

<p class="sassmeister" data-gist-id="201adb955ee09af26e2f" data-height="480" data-theme="tomorrow-night-eighties"><a href="http://sassmeister.com/gist/201adb955ee09af26e2f">Play with this gist on SassMeister.</a></p>


## Animation

<div class="l-padding-vert">
  <h3>Underline Animation</h3>
  <p class="sassmeister" data-gist-id="8318e90ab4e7e8702772" data-height="480" data-theme="tomorrow-night-eighties"><a href="http://sassmeister.com/gist/8318e90ab4e7e8702772">Play with this gist on SassMeister.</a></p>
</div>

<div class="l-padding-vert">
  <h3>Curly Brace Animation</h3>
  <p class="sassmeister" data-gist-id="c41afb4f212b652e4fef" data-height="480" data-theme="tomorrow-night-eighties"><a href="http://sassmeister.com/gist/c41afb4f212b652e4fef">Play with this gist on SassMeister.</a></p><script src="http://cdn.sassmeister.com/js/embed.js" async></script>
</div>


## Sassy resources

Alright!  We've learned how to install and compile our Sass, set up a Gulp task to process our styles, create a file structure, and have seen a number of useful patterns.  We are now cruising along smoothly at 60mph.

However, it turns out that on this highway, there is no speed limit!

There are tons of really useful [@mixins](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) and [@functions](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#function_directives) out there, and lots of people doing amazing things with Sass.

Sass is a powerful language, so it is also very easy to crash and burn.

I recommend using tools like [Sassmeister](http://sassmeister.com/) to keep an eye on the CSS that you are outputting.

In addition, take a look at the following [Sass Guidelines](http://sass-guidelin.es/) to make sure that you are writing sane, maintainable, and scalable Sass code.

<script src="http://static.sassmeister.com/js/embed.js" async></script>
