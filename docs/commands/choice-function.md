# Choice Function

## Choice Function

The choice function allows for branching dialogue by letting the player pick an option.

It takes no parameters, but opens a block that needs to contain at least a text prompt, and one or more choice\(s\)

## Example

### Simple Choice

```
choice_example:
    talk cat idle "This example shows how to use the choice command"
    choice:
        "This is the choice prompt text"
        "This is the first option the player can select":
            talk cat idle "I will say this if you select the first option"
        "This is the second choice the player can pick":
            talk cat idle "I see you picked the second choice!"
```

<!-- ![Result of the above code](../.gitbook/assets/choice.gif) -->

### Choice with conditions or skill rolls

Choices can have conditions on them to control whether they should appear. Adding a condition to a choice is done by using the `$if` syntax at the end of the line with the condition of your choice. If the condition is true the choice will appear, otherwise it won't.

It is also possible to make options roll a skill check and then branch on success or failure. The syntax is:

`roll [skillcheckid] [skill_id] [difficulty] [choice text prompt]`

A skill roll needs at least a success branch inside it, and optionally a failure branch

```
choice_example_conditions:
    talk cat idle "This example shows how to use conditions in choices"
    choice:
        "This is the choice prompt text"
        "This choice will only appear if a condition is met" $if this.DATA.someFlag:
            talk cat idle "Choice response"
        roll someSkillCheck testSkill 50 "This choice will run a skill check":
            success "Skill check succeeded":
                "This line will appear if the skill check succeeds"
            failure "Skill check failed":
                "This line will appear if the skill check fails"

```

In the example above, the first choice won't appear because the condition isn't met, and the second option will appear as a skill check.

<!-- ![Choice with a skill check](../.gitbook/assets/choice-skillcheck.gif) -->
