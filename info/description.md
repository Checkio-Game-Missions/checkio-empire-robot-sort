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
