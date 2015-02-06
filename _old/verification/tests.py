"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": (6, 4, 2),
            "answer": (6, 4, 2),
        },
        {
            "input": (1, 2, 3, 4, 5),
            "answer": (1, 2, 3, 4, 5),
        },
        {
            "input": (1, 2, 3, 5, 3),
            "answer": (1, 2, 3, 5, 3),
        },

    ],
    "Edge": [
        {
            "input": [1],
            "answer": [1],
        },
        {
            "input": [1, 3],
            "answer": [1, 3],
        },

        {
            "input": [1, 2, 3, 4, 5, 6, 7, 8, 9, 9],
            "answer": [1, 2, 3, 4, 5, 6, 7, 8, 9, 9],
        },
        {
            "input": [1, 2, 3, 4, 5, 6, 7, 8, 9, 1],
            "answer": [1, 2, 3, 4, 5, 6, 7, 8, 9, 1],
        },
        {
            "input": [9, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            "answer": [9, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        },
    ],
    "Extra": [
        {
            "input": [4, 6, 5, 2, 6, 1],
            "answer": [4, 6, 5, 2, 6, 1]
        },
        {
            "input": [3, 2, 7, 2, 3, 7, 9, 6, 9],
            "answer": [3, 2, 7, 2, 3, 7, 9, 6, 9]
        },
        {
            "input": [5, 8, 5, 3, 7, 8, 1, 5, 1, 4],
            "answer": [5, 8, 5, 3, 7, 8, 1, 5, 1, 4]
        },
        {
            "input": [7, 1, 3, 8, 5, 9, 7],
            "answer": [7, 1, 3, 8, 5, 9, 7]
        },
        {
            "input": [1, 8, 7, 9, 6, 4],
            "answer": [1, 8, 7, 9, 6, 4]
        },
        {
            "input": [3, 7, 7, 6, 7, 1, 3, 3, 4, 9],
            "answer": [3, 7, 7, 6, 7, 1, 3, 3, 4, 9]
        },
        {
            "input": [3, 5, 3],
            "answer": [3, 5, 3]
        },
        {
            "input": [1, 7, 2, 4, 7, 9, 2, 9, 7, 3],
            "answer": [1, 7, 2, 4, 7, 9, 2, 9, 7, 3]
        },
    ]

}
