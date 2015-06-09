You are given the size and initial order of the ingots as an array of numbers.
Indexes are their position, values are their sizes. 
You should order this array from the smallest to the largest in size.

For each action a Robot can swap two neighboring elements. 
Each action should be represented as a string with two digits - 
indexes of the swapped elements (ex, "01" - swap 0th and 1st ingots). 
The result should be represented as a string that 
contains the sequence of actions separated by commas. 
If the array does not require sorting, then return an empty string.

And you can swap only **N\*(N-1)/2** times, where N - is a quantity of ingots.

```
Initial   6 ============
position  4   ======== 
          2     ====

Swap      4   ========
0 - 1     6 ============ 
          2     ====
          
Swap      4   ========
1 - 2     2     ==== 
          6 ============
          
Swap      2     ====
0 - 1     4   ======== 
          6 ============
```