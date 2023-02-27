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
