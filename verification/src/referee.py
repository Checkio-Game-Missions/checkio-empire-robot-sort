from checkio_referee import RefereeBase
from checkio_referee import covercodes, validators, representations

import settings
import settings_env
from tests import TESTS

Result = validators.ValidatorResult


class SwapSortValidator(validators.BaseValidator):
    @staticmethod
    def swap(array, i, j):
        array[i], array[j] = array[j], array[i]

    def validate(self, outer_result):
        in_data = self._test.get("input", [])
        array = list(in_data[:])
        la = len(array)
        if not isinstance(outer_result, str):
            return Result(False, "The result should be a string")
        actions = outer_result.split(",") if outer_result else []
        for act in actions:
            if len(act) != 2 or not act.isdigit():
                return Result(False, "The wrong action: {}".format(act))
            i, j = int(act[0]), int(act[1])
            if i >= la or j >= la:
                return Result(False, "Index error: {}".format(act))
            if abs(i - j) != 1:
                return Result(False, "The wrong action: {}".format(act))
            self.swap(array, i, j)
        if len(actions) > (la * (la - 1)) // 2:
            return Result(False, "Too many actions.")
        if array != sorted(in_data):
            return Result(False, "The array is not sorted.")
        return Result(True)


class Referee(RefereeBase):
    TESTS = TESTS
    EXECUTABLE_PATH = settings.EXECUTABLE_PATH
    CURRENT_ENV = settings_env.CURRENT_ENV
    VALIDATOR = SwapSortValidator
    FUNCTION_NAME = "swap_sort"
    CALLED_REPRESENTATIONS = {
        "python_3": representations.py_tuple_representation,
        "python_2": representations.py_tuple_representation
    }
    ENV_COVERCODE = {
        "python_3": covercodes.py_tuple,
        "python_2": covercodes.py_tuple,
        "javascript": None,
    }
