## Overview

Utility for `shouldComponentUpdate` in React and Preact. Deeply compares props and state to detect changes and avoid unnecessary renders.

Intended for plain data structures such as `{}` and `[]`. Any other objects are compared by _reference_: `===`, not by structure.

Has an unstated peer dependency on [Emerge](https://github.com/Mitranim/emerge) (3.5 KiB), a library for dealing with plain data structures mentioned above.

## Why

`shouldComponentUpdate` is critical for the performance of frequently-updated views in React and Preact applications. React claims to implement shallow comparison in `PureComponent`, but what you really want is a deep comparison, which they don't provide.

As a rule of thumb, traversing data structures is much cheaper than making new ones. The cost of a deep `shouldComponentUpdate` is neglibible compared to the cost of rendering that it avoids.

Sticking this on all your classes is a no-brainer.

## Installation

```js
yarn add -E react-change
# or
npm i -E react-change
```

## Usage

React:

```js
import {Component} from 'react'
import {shouldComponentUpdate} from 'react-change/react'

class ViewComponent extends Component {
  shouldComponentUpdate() {return shouldComponentUpdate.apply(this, arguments)}
}

// Or
ViewComponent.prototype.shouldComponentUpdate = shouldComponentUpdate
```

Preact:

```js
import {Component} from 'preact'
import {shouldComponentUpdate} from 'react-change/preact'

class ViewComponent extends Component {
  shouldComponentUpdate() {return shouldComponentUpdate.apply(this, arguments)}
}

// Or
ViewComponent.prototype.shouldComponentUpdate = shouldComponentUpdate
```

You can stick this in a base class for all your components.

## Misc

I'm receptive to suggestions. If this library _almost_ satisfies you but needs changes, open an issue or chat me up. Contacts: https://mitranim.com/#contacts
