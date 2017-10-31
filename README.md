# Modifier Keys &middot; [![npm version](https://img.shields.io/npm/v/modifier-keys.svg)](https://www.npmjs.com/package/modifier-keys) [![Build Status](https://travis-ci.org/applitools/modifier-keys.svg?branch=master)](https://travis-ci.org/applitools/modifier-keys) [![Coverage Status](https://img.shields.io/codecov/c/github/applitools/modifier-keys.svg)](https://codecov.io/gh/applitools/modifier-keys)  
A declarative library designed to handle modifier key states across multiple systems

## Introduction
Instead of checking whether Command is pressed on macOS or control on Windows, using Modifier Keys you check for `primaryKey` and `secondaryKey`

- Primary Key - set to be Command or Control depending on the operating system
- Secondary Key - set to be Alt

Can also parse key commands to string according to the environment (e.g. `Ctrl+C`)

## Installation

Using [Yarn](https://yarnpkg.com/):  
```sh
yarn add modifier-keys
```

Using [npm](https://www.npmjs.com/):
```sh
npm install modifier-keys --save
```

Importing:
```js
import Modifier from 'modifier-keys';
```

## Usage
### Closure Usage
The Modifier closure takes a function that takes an event handler as its first argument, it then adds the primary and secondary key states onto it.

```jsx
import Modifier from 'modifier-keys';

<input type="text" onKeyDown={Modifier(this.handleKeyDown)} />

function handleKeyDown(e) {
  e.primaryKey; // bool
  e.secondaryKey; //bool
}
```

### Function Usage
You can also import a function that directly takes the event instead of using a closure on the handler like so

```jsx
import { modifier } from 'modifier-keys';

<input type="text" onKeyDown={this.handleKeyDown} />

function handleKeyDown(e) {
  let event = modifier(e);
  event.primaryKey; // bool
  event.secondaryKey; //bool
}
```

### Command Parser Usage
Takes a `key` (string that will be capitalized) and `options`
```js
import { parse } from 'modifier-keys';

parse('c', { primaryKey: true }); // ⌘C or Ctrl+C
```

#### Options
- `primaryKey` - bool, to include or not the environment's primary key
- `secondaryKey` - bool, to include or not the environment's secondary key
