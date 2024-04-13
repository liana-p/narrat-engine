---
title: JavaScript interface in Narrat
description: Narrat can call JavaScript methods, use JavaScript variables, and run arbitrary JavaScript code for cases where you need to interact with the browser or the page.
---

## JS API for Narrat

There are currently two commands that allow using JavaScript more directly in Narrat:

- `call_js_method`: Calls a JavaScript method on the page.
- `run_js`: Builds a function from an arbitrary snippet of JavaScript code and runs it, returning the result.

This is intended to be used in cases where you need to do something narrat scripting can't do, but don't want to bother adding a new command to the language via a [plugin](https://docs.narrat.dev/plugins/plugins.html)

## `call_js_method`

Syntax: `call_js_method [target] [method] [...args [optional]]`

- `target` [string|object]: The target object to call the method on. This can be an object, or a string that will be evaluated to an object. Examples: `$myVariable`, `"document.body"`, `"localStorage"`. Paths are evaluated in the context of the page, looking for the object in `window`.
- `method` [string]: The method to call on the target object.
- `args` [any]: Any number of arguments passed after the method will be passed to the JavaScript function being called too.

Examples:

```narrat
test_js:
  var stuff (new Object)
  set stuff.hello "world"
  call_js_method localStorage setItem "test_js" (json_stringify $stuff)
  var stuff2 (json_parse (call_js_method localStorage getItem "test_js"))
  log $stuff2
  var canvas (call_js_method document createElement "canvas")
  call_js_method document.body appendChild $canvas
  set canvas.class "test"
  call_js_method $canvas requestPointerLock
```

## `run_js`

Syntax: `run_js [code]`

- `code` [string]: The JavaScript code to run.

The code will be built using `Function`, in the format `return ${code}`. This will generate a function returning whatever `code` returns. The command then runs this function and returns the result.
