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

### Index HTML

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

### Basic Server

Decide how your index.html will be served up to the browser. Will you use an express server, or a quicker solution like webpack-dev-server, http-server, or some other static file server?

Note: if you are planning on writing an express server, you may want to skip to the Express section and set up your server first before continuing here.

Hint: Some suggestions
Tools like webpack-dev-server and http-server are very useful - they will serve up static files (including your index.html) from the folder you start them from. This is great if you want to start writing a client-side application but don't want to write a full express server yet (or if you don't need one - for example, if you write an application that uses a cloud database like Firebase, or a simple client app that just needs to make AJAX requests to some external APIs).

You could install them on a project-by-project basis, or install them globally using the -g flag.

If you are using an express server, then you need to make sure that you serve up your index.html for any GET requests that aren't for any other routes (like your /api/ routes).

Review the example code below:

```js
const path = require('path')
const express = require('express')
const app = express()

// you'll of course want static middleware so your browser can request things like your 'bundle.js'
app.use(express.static(path.join(__dirname, './path/to/your/static/assets')))

// Any routes or other various middlewares should go here!

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that would go before this as well)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, './path/to/your/index.html'))
})
```

Note that if you want to give more informational messages about valid frontend routes vs routes that are invalid change up the route which is exampled below:

```js
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, './path/to/your/index.html'));
});</
```

## Express

### Entry point

In your project folder, create a starting point for your server (developers often choose something like main.js, server.js, or just plain index.js. It's also often a good idea to split out your server code and client code into different folders.
Review the example structure for a project folder below:

```js
my-project/
-- client/
---- index.js    <-- Entry point for client JavaScript
-- node_modules/
-- public/
-- server/
---- index.js    <-- Entry point for server JavaScript
-- .gitignore
-- package.json
```

Of course, you're going to want to install express too. In your terminal use the following command: npm install --save express

### Create an App

Create your app with express.

Review the code below for an example of how to use express in your app

```js
const express = require('express')
const app = express()
```

### Logging Middleware

Having server logs helps with debugging (even in production environments). Install and hook up a logger like morgan, express-logger, or Fullstack's own volleyball.

For example, if we choose to use morgan:

Run the following command in your terminal: npm install --save morgan

Review the code below for an example of how to use morgan in your app

```js
const morgan = require('morgan')
app.use(morgan('dev'))
```

### Statics Middleware

Once your browser gets your index.html, it often needs to request static assets from your server - these include javascript files, css files, and images. Many developers organize this content by putting it into a public folder (but this is of course up to you).

Serve 'em up with some static middleware!

Review the code below for an example of how to serve static middleware

```js
app.use(express.static(path.join(__dirname, './path/to/static/assets')))
```

### Parsing Middleware

Requests frequently contain a body - if you want to use it in req.body, then you'll need some middleware to parse the body.

In your terminal run the following command: npm install --save body-parser.

Review the code below for an example of how to use body-parsing middleware in your app

```js
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
```

### API Routes

Your API is the main course of your server. It's often preferable to break up your different routes using the router object. By convention, API routes are prefixed with /api/ - this is purely done to namespace them away from your "front-end routes" (such as those created by react-router).

You could organize these however you choose. The hint below contains just one suggestion of how you might organize this.

Assume we have a file structure like the example below:

```js
/my-project
--/apiRoutes
----kittens.js
----index.js
----puppies.js
----users.js
--server.js
```

From your main app pipeline, you might mount all of your API routes on /api like exampled below:

```js
// server.js
app.use('/api', require('./apiRoutes')) // matches all requests to /api
```

Then, in apiRoutes/index.js, you might further delegate each router into its own namespace like exampled below:

```js
// apiRoutes/index.js
const router = require('express').Router()

router.use('/users', require('./users')) // matches all requests to /api/users/
router.use('/puppies', require('./puppies')) // matches all requests to  /api/puppies/
router.use('/kittens', require('./kittens')) // matches all requests to  /api/kittens/

module.exports = router
```

Now, in each individual router, each route will automatically match on /api/routeName/, so you can write your routes in the following fashion exampled below:

```js
// apiRoutes/puppies.js
const router = require('express').Router()

// matches GET requests to /api/puppies/
router.get('/', function (req, res, next) {
  /* etc */
})

// matches POST requests to /api/puppies/
router.post('/', function (req, res, next) {
  /* etc */
})

// matches PUT requests to /api/puppies/:puppyId
router.put('/:puppyId', function (req, res, next) {
  /* etc */
})

// matches DELETE requests to /api/puppies/:puppyId
router.delete('/:puppyId', function (req, res, next) {
  /* etc */
})

module.exports = router
```

Note that the advantage here is that instead of writing out router.get('/api/puppies') and so forth for each route, we can just write router.get('/'), because of the way we've composed our middleware together.

### Handle 404s

What if a user requests an API route that doesn't exist? For example, if we're serving up puppies, kittens and users, what if a user asks for /api/sloths?

Give 'em the 'ol 404!

Using our apiRoutes/index.js from before, the code below examples the use of 404 errors:

```js
// routes/index.js
const router = require('express').Router()

router.use('/users', require('./users')) // Users? Check.
router.use('/puppies', require('./puppies')) // Puppies? Check.
router.use('/kittens', require('./kittens')) // Kittens? Check.

// Sloths?!?! Get outta town!
router.use(function (req, res, next) {
  const err = new Error('Not found.')
  err.status = 404
  next(err)
})

module.exports = router
```

### Send Index HTML

Because we generally want to build single-page applications (or SPAs), our server should send its index.html for any requests that don't match one of our API routes.

Make sure this is after all of your routes in your server entry file!

Review the example code below:

```js
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './path/to/index.html');
});
```

### Handle 500 Errors

If anything got this far, then it seems like we messed up. Let's catch those 500 errors and log them out. We'll thank ourselves later when we can read our server logs and debug.

Make sure this is at the very end of your server entry file!

Review the example code below:

```js
app.use(function (err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
```

### Dev dependencies

npm install --save-dev your DEV dependencies

In your terminal use the following commands:
npm install --save-dev webpack webpack-cli @babel/core babel-loader @babel/preset-react

If you want to be proactive in making sure your code is safe for older browsers, you may also install @babel/preset-env.

### Regular Dependencies

npm install --save your regular dependencies.

In your terminal use the following commands:

npm install --save react react-dom react-router-dom

### Index JS

Index JS
Decide on an 'entry' file and an 'output' file for your webpack pipeline.

Your entry file might be something simple like an index.js, app/main.js, client/app.js or browser/index.js.

Your output file will be created by webpack. You don't need to actually create it yet - just decide where you want it to live. This could be in the root of your app, or a public folder - it is up to you.
