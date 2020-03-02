# function-ts

## Overview

**function-ts** is an implementation of Haskell's most popular list functions, function composition, and some custom IO monadic functions in TypeScript.

## Technical Notes

The implementation takes advantage of arrow functions from the ES6 standard and types from TypeScript.

Having the arrow function syntax makes coding in the functional programming paradigm easy. For example:

```text
Lambda Calculus
λx. 2 + x
```

```javascript
// JavaScript
x => 2 + x
```

In fact, the arrow function capabilities allow for even advanced features such as partial functional application to exist!

TypeScript allows for complex type definitions, most notably function types and generic types.

All of the type annotation allows us to define an analogous Haskell type definition which is documented above each function.

Here is an example of analogous Haskell and TypeScript code:

```haskell
-- Haskell
add :: Int -> Int -> Int
add x y = x + y
```

```typescript
// TypeScript
const add: (x: number) => (y: number) => number
/* add */ = x => y => x + y;
```
Haskell pattern matching does not exist in TypeScript so the implementation uses `if` statements as cases and `else` as the wildcard.

### IO

`out` is a function that takes in a value and passes it into JavaScript's `console.log`. `out` also returns an IO monad type using the character `'ё'`.

The `sequence` function takes in the `[Function, any][]` type, meaning that `sequence` takes a list of functions and corresponding arguments and applies them in sequence. However, since `sequence` can take in functions that return an IO monad type, the sequence function itself also has that same IO monad type.

Finally, `group` is identical to `sequence` except it wraps the function calls with `console.group` and `console.groupEnd`.

### Composition

`dot` is a function that takes in two functions, modeling mathematical function composition: `f·g` or `f(g(x)`.

The `g` function takes input type `A` to produce type `B` and the `f` function takes in the output from `g` an input of type `B` to produce type `C`.

The type of `dot` is `(B -> C) -> (A -> B) -> A -> C` which means that you can partially apply the first two functions to create a new function, which can then be completely applied when the input argument is supplied later!

### Lists

One of the most useful data structures in Haskell are Lists!

Lists in Haskell are typically one type so all of the functions implemented are constrained to singly-typed lists.

Most of the functions implemented were found from [Haskell Wiki](https://wiki.haskell.org/How_to_work_on_lists).

### Testing

`test.ts` uses the functions `sequence`, `out`, and `group` to structure the tests like traditional JavaScript libraries.

Since arrays are objects in implementation, the arrays cannot be compared with the `===` operator as that compares the object reference as opposed to values; to bypass this, the arrays were stringified and then compared.

The `C` function is for the UI, writing '✓' when the test case passed and '✗' when it failed.

I found numerous bugs, particularly in the `minimum` and `maximum` functions, when writing the test suite!
