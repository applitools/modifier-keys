# Modifier Keys
[![npm version](https://badge.fury.io/js/modifier-keys.svg)](https://badge.fury.io/js/modifier-keys) [![Build Status](https://travis-ci.org/applitools/modifier-keys.svg?branch=master)](https://travis-ci.org/applitools/modifier-keys)  
A declarative library designed to handle modifier key states across multiple systems

## Introduction
Instead of checking whether Command is pressed on macOS or control on Windows, using Modifier Keys you check for `primaryKey` and `secondaryKey`

- Primary Key - set to be Command or Control depending on the operating system
- Secondary Key - set to be Alt

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
