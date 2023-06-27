# Join

The `join` command joins strings together, with a specific joiner between them:

Syntax: `concat [joiner] [string1] [string2] [string 3]...`

Example:

```narrat
main:
  var helloWorld (join ", " "Hello" "world")
  "%{helloWorld}" // Will print "Hello, world"
```
