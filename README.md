# Node/Typescript Boiler Plate
The main purpose of this repository is to show a working Node.js API Server workflow for writing Node code in TypeScript Using Basic Packages.

It is not a goal to be a comprehensive and definitive guide to making a TypeScript and Node project, but as a working reference maintained by the community. If you are interested in starting a new TypeScript project - check out the tools reference in the TypeScript Website


# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [Dependencies](#dependencies)
- [Enviroment-Setup](#Enviroment-Setup)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)


# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Narsinhs/node-ts-boilerplate.git <project_name>

- Install dependencies
```
cd <project_name>
npm install
```

- Build and run the project
```
npm run build
npm start
```
Or, if you're using VS Code, you can use `cmd + shift + b` to run the default build task (which is mapped to `npm run build`), and then you can use the command palette (`cmd + shift + p`) and select `Tasks: Run Task` > `npm: start` to run `npm start` for you.

> **Note on editors!** - TypeScript has great support in [every editor](http://www.typescriptlang.org/index.html#download-links), but this project has been pre-configured for use with [VS Code](https://code.visualstudio.com/).
Throughout the README We will try to call out specific places where VS Code really shines or where this project has been setup to take advantage of specific features.

Finally, navigate to `http://localhost:3000/swagger` and you should see the swagger document being served and rendered locally!


### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:


| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `build`                   | Full build. Runs ALL build tasks (`build-sass`, `build-ts`, `lint`, `copy-static-assets`)       |
| `devs`              | Runs node with nodemon so the process restarts if it crashes. Used in the main watch task         |
| `pdevs`                   | Runs all watch tasks (TypeScript, Sass, Node). Use this if you're not touching static assets.     |


#Enviroment-Setup
Update the constraint provided in .env file.

#Dependencies
Dependencies are managed through `package.json`.

