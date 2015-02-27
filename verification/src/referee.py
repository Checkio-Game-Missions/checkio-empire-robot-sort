from checkio_referee import RefereeBase
from checkio_referee.covercode import py_tuple
from checkio_referee.validators import BaseValidator, ValidationError

import settings
import settings_env
from tests import TESTS


class SwapSortValidator(BaseValidator):
    @staticmethod
    def swap(array, i, j):
        array[i], array[j] = array[j], array[i]

    def validate(self, outer_result):
        in_data = self._test.get("input", [])
        array = list(in_data[:])
        la = len(array)
        if not isinstance(outer_result, str):
            self.additional_data = "The result should be a string"
            raise ValidationError
        actions = outer_result.split(",") if outer_result else []
        for act in actions:
            if len(act) != 2 or not act.isdigit():
                self.additional_data = "The wrong action: {}".format(act)
                raise ValidationError
            i, j = int(act[0]), int(act[1])
            if i >= la or j >= la:
                self.additional_data = "Index error: {}".format(act)
                raise ValidationError
            if abs(i - j) != 1:
                self.additional_data = "The wrong action: {}".format(act)
                raise ValidationError
            self.swap(array, i, j)
        if len(actions) > (la * (la - 1)) // 2:
            self.additional_data = "Too many actions."
            raise ValidationError
        if array != sorted(in_data):
            self.additional_data = "The array is not sorted."
            raise ValidationError


class Referee(RefereeBase):
    TESTS = TESTS
    EXECUTABLE_PATH = settings.EXECUTABLE_PATH
    CURRENT_ENV = settings_env.CURRENT_ENV
    VALIDATOR = SwapSortValidator
    FUNCTION_NAME = "swap_sort"
    ENV_COVERCODE = {
        "python_3": py_tuple,
        "python_2": py_tuple,
        "javascript": None,
    }
