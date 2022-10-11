# Other math operations

{% hint style="info" %}
Most of the functions below are implemented the same way as their counterpart in JavaScript, and often use it under the hood
{% endhint %}

### Absolute numbers and negative numbers

* `abs [number]` Returns absolute value for number (makes it positive)
* `neg [number]`: Makes number negative

### Keeping numbers between minimum and maximums:

* `min [number1] [number2]`: Returns the **smallest** of the two numbers
* `max [number1] [number2]`: Returns the **biggest** of the two numbers
* `clamp [min] [max] [value]`: Returns value, or min if value is below min, or max if value is above max

### Rounding numbers

* `floor [number]`: Rounds \[number] **down** to an integer (ie. 1.7 becomes 1)
* `ceil [number]:` Rounds \[number] **up** to an integer (1.2 becomes 2)
* `round [number]`: Rounds \[number] to **nearest** integer. 1.2 becomes 1, 1.8 becomes 2, 1.5 becomes 2, 1.49999 becomes 1

### Powers

* `sqrt [number]`: Returns square root of the number
* `^ [base] [exponent]`: Returns \[base] to the power of \[exponent]
