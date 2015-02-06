All ingots should be sorted by size in each lot while passing conveyor.
Because the conveyor is already running, robots needs to quickly swap neighbouring ingots.

You are given the sizes and initial order of the ingots as an array of numbers.
Indexes are position, values are sizes.
You should order this array from the smallest to the largest in size.

For each action Robot can swap only two neighbouring elements.
Each action should be represented as a string with two digits - indexes of the swapped elements
(ex, "01" - swap 0th and 1st ingots).
The result should be represented as a string that contains the sequence of actions separated by commas.
If the array does not require sorting, then return an empty string.

And you can swap only **N\*(N-1)/2** times, where N - is a quantity of ingots.

![Actions](actions.svg)

**Input:** An array as a tuple of integers.

**Output:** The sequence of actions as a string.

**Example:**

```python
swapsort((6, 4, 2)) == "01,12,01"
swapsort((1, 2, 3, 4, 5)) == ""
swapsort((1, 2, 3, 5, 3)) == "43"
```
**How it is used:**

This mission will show you how to work the simplest sorting algorithms.
And this can be useful, if you need to build a production line for your factory.

**Precondition:**
```python
1 <= len(array) <= 10
all(1 <= n <= 10 for n in array)
```

