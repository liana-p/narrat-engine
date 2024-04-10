# Split

The `split` command splits strings into arrays:

Syntax: `split [splitter] [string]`

Example:

```narrat
main:
  var arr (split " " "Hello world") // arr = ["Hello", "world"]
  var arr1 (split "" "Hello world") // arr1 = [ "H", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
```
