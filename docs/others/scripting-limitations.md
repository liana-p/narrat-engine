---
title: Known limmitations in narrat scripts
description: This page lists known limitations and issues with narrat scripting
---

# Known limitations in narrat scripts

Narrat scripting is a custom made engine designed to make it easy to write dialogue. Because it does a lot of "magic" behind the scenes to make the engine easy to use, it has a few inherent limitations

## Circular References

Circular references in variables will cause issues with saving because the state is stringified

Note: This doesn't apply to screen objects which have special code for handling references.

## Duplicated references

Duplicated references to the same object can also be an issue because once the state is stringified for saving, the value will be duplicated instead of being a reference

Note: This doesn't apply to screen objects which have special code for handling references.
