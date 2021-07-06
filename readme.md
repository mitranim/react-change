## Overview

Utility for `shouldComponentUpdate` in React and Preact. Deeply compares props and state to detect changes and avoid unnecessary renders.

Intended for plain data structures such as `{}` and `[]`. Any other objects are compared by _reference_: `===`, not by structure.

Tiny, dependency-free, single file, native module.

## Why

`shouldComponentUpdate` is critical for the performance of frequently-updated views in React and Preact applications. React claims to implement shallow comparison in `PureComponent`, but what you really want is a deep comparison, which they don't provide.

As a rule of thumb, traversing data structures is much cheaper than making new ones. The cost of a deep `shouldComponentUpdate` is neglibible compared to the cost of rendering that it avoids.

Sticking this on all your classes is a no-brainer.

## Installation

```sh
npm i -E react-change
```

## Usage

```js
import {Component} from 'react'
import {shouldComponentUpdate} from 'react-change'

class ViewComponent extends Component {
  shouldComponentUpdate() {
    return shouldComponentUpdate.apply(this, arguments)
  }
}
```

You can stick this in a base class for all your components.

## Changelog

### 0.3.1

Support equality for `Date` and `URL` objects.

### 0.3.0

Now dependency-free and provided as a native module.

## Misc

I'm receptive to suggestions. If this library _almost_ satisfies you but needs changes, open an issue or chat me up. Contacts: https://mitranim.com/#contacts
