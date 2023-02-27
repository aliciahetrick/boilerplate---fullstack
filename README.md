# Boilermaker

- Express
- Sequelize
- React
- Redux
- JSON web tokens

## Setup

Create your project folder. In your terminal use the following commands: npm init, git init, and make a .gitignore file. Choose your .gitignore'd files wisely!

Don't forget your .gitignore! You should make sure that your .gitignore lists your node_modules directory and your bundled client javascript file (if you're using a module builder like webpack).

Example of a .gitignore file: (assuming your bundled js file is called 'bundle.js', and is located in the root of your project folder)

```js
node_modules
bundle.js
bundle.js.map
```

If you're wondering why we're ignoring bundle.js, it's because it will become a fairly large file that will always change. Instead of git tracking it, we can ignore it and either build it before setting it up on our production server (or have our production server build it).

## React

## Index HTML

Construct an index.html. At minimum, it should have an <html> tag, a <head>, a <body> and and a single <script> tag to serve up your bundled javascript. It should also have at least one <div> with an id that you can use ReactDOM.render to render your React application (app) into. Also make sure that you only load your bundled javascript after the DOM loads.

Hint: Solution
Review the following example code:

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Our js bundle will be in 'bundle.js' -->
    <!-- The 'defer' attribute will ensure that it is run only after the DOM finishes loading -->
    <script src="/bundle.js" defer></script>
  </head>
  <body>
    <!-- We will render our React app into a div with an id of 'app' -->
    <!-- We can grab it off the DOM by saying document.getElementById('app'); -->
    <div id="app"></div>
  </body>
</html>
```

You may also want to include some other useful tags in your head section. Check out the example code below:

```html
<!-- Responsive design? Check. This tag will make mobile browsers scale to device width -->
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Defines the character set -->
<meta charset="UTF-8" />
<!-- MDN recommends placing this right after your <head> tag -->
<!-- "as some browsers restart the parsing of an HTML document if the declared charset is different from what they had anticipated" -->
<!-- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Introduction_to_HTML5 -->

<!-- Give your app a swell name -->
<title>Appy the App!</title>
```
