# Add

## Add Function

The `add` function is similar to the `set` function, but increments values. You can use it to add a number to an existing value, or substract by adding a negative number.

### Example

The following code will setup a `counter` variable, then effectively put the player in a loop where they can increase the counter up to 10 times until they have a new choice to move on.

```
add_example:
    set data.counter 0
    jump add_example_add

add_example_add:
    choice:
        talk cat idle "Do you want to increase the counter? You can only do it 10 times":
        "Increase the counter" $if this.DATA.counter < 10:
            add data.counter 1
        "No!":
            talk cat idle "Ok then"
        "I'm done" $if this.data.counter >= 10:
            jump add_example_end
    jump add_example_add

add_example_end:
    talk cat idle "It seems you're done with the counter now"

```

![Result of the above code](../../.gitbook/assets/add\_example.gif)
