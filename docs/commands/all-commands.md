---
description: This page contains a list of all the existing narrat commands
---

# All commands list

## Commands list

#### Dialog

| Command                                   | Example                                        | Description                                                                                              |
| ----------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [talk](text-commands/talk-function.md)    | `talk player idle "Hello everyone"`            | Makes a character talk in a specific pose                                                                |
| [think](text-commands/talk-function-1.md) | `think player idle "I wonder if they like me"` | Makes a character think in a specific pose (think is the same as talk but without quotes around)         |
| text command (Empty command)              | `"Hello world"`                                | Writing text without a command will print that text as if it was said "by the game", without a character |
|                                           |

#### Basic program flow

| Command                             | Example                                                                                                                                                               | Description                                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [jump](api-jump.md)                 | `jump myLabel`                                                                                                                                                        | Jumps to a label (stops current script)                                                                                                                                                 |
| [run](../scripting/functions.md)    | `run myLabel [arg1] [arg2] [...] // Returns whatever the label returned, if anything`                                                                                 | Runs a label as a function with optional arguments passed to it, then continues back where the script was                                                                               |
| [return](../scripting/functions.md) | `return $test`                                                                                                                                                        | Returns a value. Exits the current label and returns the first argument                                                                                                                 |
| [if](if-function.md)                | <p><br><code>if $data.hasFood:</code><br><code>"I have food, so we can eat a meal!"</code><br><code>else:</code><br><code>"We have nothing to eat"</code><br><br></p> | Runs a condition on the passed value. If the condition is true, the first branch is run. Otherwise, an optional `else:` branch can be provided for what to run when the condition fails |

#### Choices

| Command                      | Example                                                                                                                                                                                                                             | Description                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| [choice](choice-function.md) | <p><br><code>choice:</code><br><code>"Would you like tea?"</code><br><code>"Yes":</code><br><code>"Your friend serves you a cup of tea"</code><br><code>"No":</code><br><code>"Your friend makes tea for themselves"</code><br></p> | Lets the player choose between two or more options. See the linked documentation for more info. |
| [text_field](text-field.md)  | `text_field "A prompt text"`                                                                                                                                                                                                        | Creates a text field for the player to enter text with a prompt. Returns the text entered       |

#### Logic operators and conditions

| Command                                                | Example                                                                         | Description                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [==](logical-operators.md) ,`>`, `<`, `<=`, `>=`, `!=` | `== 5 5 // Returns true`                                                        | Comparison operators to check if things are equal/unequal/lower than/etc |
| [!](logical-operators.md)                              | <p><code>if (! $data.doorOpen):</code><br><code>"The door is closed"</code></p> | Negates a value                                                          |
| [&&, \|\|](logical-operators.md)                       | `if (\|\| $data.doorOpen $data.hasKey):`                                        | And and Or logical operators                                             |
| [?](logical-operators.md)                              | `var isDead (? (<= $data.life 0) true : false)`                                 | Ternary operator                                                         |

#### Math and arithmetic

| Command                                      | Example                                                                                                                                                           | Description                                                                                                        |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [+](math-commands/arithmetic-operators.md)   | `+ 1 2 // Returns 3`                                                                                                                                              | Adds numbers passed as arguments                                                                                   |
| [-](math-commands/arithmetic-operators.md)   | `- 2 1 // Returns 1`                                                                                                                                              | Substracts the first number passed with the others                                                                 |
| [\*](math-commands/arithmetic-operators.md)  | `* 2 3 // Returns 6`                                                                                                                                              | Multiplies the numbers together                                                                                    |
| [/](math-commands/arithmetic-operators.md)   | `/ 1 2 // Returns 0.5`                                                                                                                                            | Divides the first number by the others, in sequence                                                                |
| [min](math-commands/other-math-operations)   | `min 100 50 // Returns 50`                                                                                                                                        | Returns the smallest value passed                                                                                  |
| [max](math-commands/other-math-operations)   | `max 50 100 // Returns 100`                                                                                                                                       | Returns the highest value passed                                                                                   |
| [clamp](math-commands/other-math-operations) | `clamp 0 100 $data.playerHealth` If playerHealth is below 0, return 0. If playerHealth is between 0 and 100, returns it. If playerHealth is over 100, returns 100 | Returns the third value passed, constrained between a minimum and maximum value passed as the first two parameters |
| [floor](math-commands/other-math-operations) | `floor 0.75 // Returns 0`                                                                                                                                         | Rounds a number, rounding down                                                                                     |
| [ceil](math-commands/other-math-operations)  | `ceil 0.25 // Returns 1`                                                                                                                                          | Rounds a number, rounding up                                                                                       |
| [round](math-commands/other-math-operations) | `round 0.5 // Returns 1`                                                                                                                                          | Rounds a number to the nearest integer                                                                             |
| [sqrt](math-commands/other-math-operations)  | `sqrt 4 // Returns 2`                                                                                                                                             | Returns the square root of a number                                                                                |
| [^](math-commands/other-math-operations)     | `^ 3 2 // Returns 9`                                                                                                                                              | Returns the first number to the power of the second number                                                         |

#### Audio

| Command                                      | Example                        | Description                                                                                                                 |
| -------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| [play](audio/play-function.md#play-function) | `play music myMusic [channel]` | Plays the music `myMusic` in the mode `music` (possible modes: `music`, `ambiance, sound), with an optional channel number` |
| [pause](audio/pause.md)                      | `pause music [channel]`        | Pauses a music mode with an optional channel number                                                                         |
| [resume]((audio/pause.md) /resume.md)        | `resume music [channel]`       | Resumes a music mode with an optional channel number                                                                        |
| [stop](audio/stop.md)                        | `stop music [channel]`         | Same as pause but stops                                                                                                     |

#### Items

| Command                                                   | Example                                                                                | Description                                  |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------- |
| [add_item](../features/inventory.md)                      | `add_item bread 1`                                                                     | Adds an amount of an item to the player      |
| [remove_item](../features/inventory.md)                   | `remove_item bread 1`                                                                  | Removes an amount of an item                 |
| [has_item?](../features/inventory.md)                     | <p><br><code>if (has_item? bread 1):</code><br><code>"Let's eat bread!"</code><br></p> | Returns true if there is enough of the item  |
| [item_amount?](../features/inventory.md)                  | `item_amount? bread // returns the amount of bread`                                    | Returns the amount of an item the player has |
| [enable_interaction](../guides/items#interaction-tags)    | `enable_interaction mytag`                                                             | Enables an interaction tag (see docs)        |
| [`disable_interaction`](../guides/items#interaction-tags) | `disable_interaction mytag`                                                            | Disables an interaction tag (see docs)       |

#### Achievements

| Command                                           | Example                                       | Description                                                            |
| ------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| [unlock_achievement](../features/achievements.md) | `unlock_achievement win_game`                 | Unlocks an achievement                                                 |
| [has_achievement?](../features/achievements.md)   | `set data.hasWon (has_achievement? win_game)` | Returns true if the player has the passed achievement, otherwise false |

#### Notifications

| Command                                                            | Example                 | Description                     |
| ------------------------------------------------------------------ | ----------------------- | ------------------------------- |
| [`notify`](notify/)                                                | `notify "Hello world"`  | Adds a notification to the game |
| [disable_notifications](notify/disable-or-enable-notifications.md) | `disable_notifications` | Disables all notifications      |
| [enable_notifications](notify/disable-or-enable-notifications.md)  | `enable_notifications`  | Enables notifications           |

#### Quests

| Command                                          | Example                                                            | Description                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| [start_quest](../features/quests.md)             | `start_quest myQuest`                                              | Starts a quest                                                            |
| [complete_quest](../features/quests.md)          | `complete_quest myQuest`                                           | Completes a quest                                                         |
| `` [`start_objective`](../features/quests.md) `` | `start_objective myQuest myObjective`                              | Starts an objective in a quest (useful for quests with hidden objectives) |
| [complete_objective](../features/quests.md)      | `complete_objective myQuest myObjective`                           | Completes an objective                                                    |
| [quest_completed?](../features/quests.md)        | `quest_completed? myQuest // returns true or false`                | Check if a quest is completed                                             |
| [objective_completed?](../features/quests.md)    | `objective_completed? myQuest myObjective //returns true or false` | Check if a quest objective is completed                                   |
| [quest_started?](../features/quests.md)          | `quest_started? myQuest // Returns true or false`                  | Check if a quest is started                                               |
| [objective_started?](../features/quests.md)      | `objective_started? myQuest myObjective // Returns true or false`  | Check if a quest objective is started                                     |

#### Random

| Command                                  | Example                                                                      | Description                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [random](random-generation.md)           | `random 0 100 // Returns a random integer between 0 and 100 `                | Returns a random integer between two numbers passed (inclusive) |
| [random_float](random-generation.md)     | `random_float 0 100 // Returns a random float between 0 and 100 `            | Returns a random float between two numbers passed (inclusive)   |
| [random_from_args](random-generation.md) | `random_from_args 1 2 3 4 5 // Returns a random argument passed `            | Returns a random argument passed                                |
| random_from_array                        | `random_from_array $data.myArray // Returns a random element from the array` | Returns a random element from an array                          |

#### Viewport screen and buttons

| Command                                                   | Example                       | Description                                                                             |
| --------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| [set_screen](left-side-viewport-commands/set-screen.md)   | `set_screen myScreen [layer]` | Sets the screen to a screen with the given ID with an optional layer number (default 0) |
| [empty_layer](left-side-viewport-commands/empty-layer.md) | `empty_layer 0`               | Removes all items from a layer                                                          |
| [set_button](left-side-viewport-commands/set-button.md)   | `set_button myButton true`    | changes the value of a button (true, false, hidden) ID                                  |

#### Variables

| Command                                    | Example                     | Description                                                                                                                                |
| ------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [set](modifying-variables/set-function.md) | `set data.playerHealth 100` | Sets a variable to a value                                                                                                                 |
| [add](modifying-variables/add-function.md) | `add data.playerHealth 10`  | Adds a value to a variable                                                                                                                 |
| `var`                                      | `var test 3`                | Declares a local variable with a value. The variable will only exist in the current label and will stop existing once the label is exited. |

#### Skills

| Command                                     | Example                                                         | Description                                                                                   |
| ------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [add_level](skills-commands/add-level.md)   | `add_level agility 1`                                           | Adds levels to a skill                                                                        |
| [set_level](skills-commands/set-level.md)   | `set_level agility 1`                                           | Sets the level of a skill                                                                     |
| [add_xp](skills-commands/add-xp.md)         | `add_xp agility 10`                                             | Adds experience to a skill                                                                    |
| [get_level](skills-commands/get-level.md)   | `get_level agility`                                             | Gets the level of a skill                                                                     |
| [get_xp](skills-commands/get-xp.md)         | `get_xp agility`                                                | Gets the experience of a skill                                                                |
| [roll](skills-commands/roll.md)             | `roll mySkillCheck agility 50 // Returns true or false`         | Runs a skill check with a certain difficulty against a skill dice                             |
| `get_skill_check`                           | `get_skill_check mySkillCheck // Returns a skill check's state` | Gets the result of a skill check (object with `happened`, `succeeded`, and `hidden` booleans) |
| `skill_check_result`                        | `skill_check_result mySkillCheck // Returns true or false`      | Gets the result of a skill check as boolean                                                   |
| [reset_roll](skills-commands/reset-roll.md) | `reset_roll mySkillCheck`                                       | Resets a skill check                                                                          |

#### Stats

| Command                                             | Example                 | Description              |
| --------------------------------------------------- | ----------------------- | ------------------------ |
| [add_stat](/commands/stats/add-stat.md)             | `add_stat myStat 10`    | Adds a value to a stat   |
| [set_stat](/commands/stats/set-stat.md)             | `set_stat myStat 10`    | Sets a stat to a value   |
| [get_stat_value](/commands/stats/get-stat-value.md) | `get_stat_value myStat` | Gets the value of a stat |

#### Arrays

Imagine $data.myArray contains an array with [25, 50, 75]

| Command           | Example                                                                       | Description                                                                                                                                                    |
| ----------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| new               | `set data.myArray (new Array)`                                                | Creates an array                                                                                                                                               |
| push              | `push $data.myArray 100`                                                      | Adds a value at the end of an array                                                                                                                            |
| pop               | `pop $data.myArray // Returns 100`                                            | Removes the last value of an array, returning it                                                                                                               |
| shift             | `shift $data.myArray // Returns 25`                                           | Removes the first value of an array, returning it                                                                                                              |
| array_join        | `array_join $data.myArray ", " // Returns "25, 50, 75"`                       | Joins an array into a string, with the first parameter being the separator to use                                                                              |
| array_concat      | `array_concat $data.myArray $data.myArray2 // Returns [25, 50, 75, 100, 125]` | Concatenates two arrays                                                                                                                                        |
| includes          | `includes $data.myArray 25 // Returns true`                                   | Checks if an array includes a value                                                                                                                            |
| reverse           | `reverse $data.myArray // Returns [75, 50, 25]`                               | Reverses an array                                                                                                                                              |
| slice             | `slice $data.myArray 1 2 // Returns [50, 75] `                                | Returns a slice of an array, with the first parameter being the start index and the second being the end index                                                 |
| splice            | `splice $data.myArray 1 2 // Returns [50, 75]`                                | Removes a slice of an array, with the first parameter being the start index and the second being the number of elements to remove. Returns the sliced elements |
| random_from_array | `random_from_array $data.myArray // Returns a random element from the array`  | Returns a random element from an array                                                                                                                         |
| shuffle           | `shuffle $data.myArray // Returns a shuffled array`                           | Shuffles an array                                                                                                                                              |

#### Time

| Command          | Example                                            | Description                                           |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------- |
| time_now         | `var now (time_now) // returns current time in ms` | Returns the current unix timestamp in miliseconds     |
| total_playtime   | `var time_played (total_playtime)`                 | Returns the current total playtime for this save file |
| session_playtime | `var time_played (session_playtime)`               | Returns the current session playtime                  |
| to_days          | `var days (to_days 100000)`                        | Converts a time in ms to days                         |
| to_hours         | `var hours (to_hours 100000)`                      | Converts a time in ms to hours                        |
| to_minutes       | `var minutes (to_minutes 100000)`                  | Converts a time in ms to minutes                      |
| to_seconds       | `var seconds (to_seconds 100000)`                  | Converts a time in ms to seconds                      |

#### Strings

| Command                          | Example                     | Description                                                                  |
| -------------------------------- | --------------------------- | ---------------------------------------------------------------------------- |
| [concat](string-commands/concat) | `concat "Hello" "World"`    | Concatenates two or more strings                                             |
| [join](string-commands/join)     | `join ", " "Hello" "World"` | Joins x strings, with the first character being the join string between them |

#### Screen Objects

Screen objects are new and not documented yet, basic usage is to put the result of `create_sprite` or `create_object` in a variable and then manipulate it. Example:

```
set data.playerSprite (create_sprite img/player.png 50 50)
wait 1000
set data.playerSprite.x 100 // moves the player to x 100
wait 1000
delete_sprite $data.playerSprite
```

| Command       | Example                                  | Description                                   |
| ------------- | ---------------------------------------- | --------------------------------------------- |
| create_sprite | `create_sprite img/character.png 55 125` | Creates a sprite using an image at a position |
| create_object | `create_object 55 125`                   | Creates an object at a position               |
| delete_sprite | `delete_sprite $mySprite`                | Deletes a sprite (stored in a variable)       |

#### Others

| command                                     | example                                                                         | description                                                                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [clear_dialog](clear-dialog.md)             | `clear_dialog`                                                                  | Clears the dialog panel                                                                                                                                                   |
| log                                         | `log "what's the value of test? %{test}" // Will print this log in the console` | Prints a log in the browser developer tools. Useful for debugging or checking variable values                                                                             |
| menu_return                                 | `menu_return`                                                                   | Exits the game and returns to the main menu                                                                                                                               |
| [save](save-commands.md#save)               | `save [save file name]`                                                         | Opens the manual save screen for the player to save the game (optional parameter for the name of the save file, useful to pass the name of the level/chapter for example) |
| `reset_global_save`                         | `reset_global_save`                                                             | Resets the global part of the save                                                                                                                                        |
| [save_prompt](save-commands.md#save_prompt) | `save_prompt [save file name]`                                                  | Same as save, but asks the user if they want to save first                                                                                                                |
| [wait](wait.md)                             | `wait 500`                                                                      | Makes the script pause for x milliseconds                                                                                                                                 |
| load_data                                   | `set data.myData (load_data data/myDataFile.yaml)`                              | Loads data from the data file path passed and returns it                                                                                                                  |
