# Concat

The `concat` command concatenates strings together (combines them):

Syntax: `concat [string1] [string2] [string 3]...`

Example:

```
main:
  var helloWorld (concat "Hello " "world")
  "%{helloWorld}
```

