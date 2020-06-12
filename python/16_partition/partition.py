def partition(lst, fn):
    """Partition lst by predicate.
     - lst: list of items
     - fn: function that returns True or False
     Returns new list: [a, b], where `a` are items that passed fn test,
     and `b` are items that failed fn test.
        >>> def is_even(num):
        ...     return num % 2 == 0
        >>> def is_string(el):
        ...     return isinstance(el, str)
        >>> partition([1, 2, 3, 4], is_even)
        [[2, 4], [1, 3]]
        >>> partition(["hi", None, 6, "bye"], is_string)
        [['hi', 'bye'], [None, 6]]
    """
    returned_list = []
    passed = []
    failed = []
    if fn == 'is_even':
        for item in lst:
            if item % 2 == 0:
                passed.append(item)
            else:
                failed.append(item)
        returned_list.append(passed)
        returned_list.append(failed)
        return returned_list
    elif fn == 'is_string':
        for item in lst:
            if type(item) == str:
                passed.append(item)
            else:
                failed.append(item)
        returned_list.append(passed)
        returned_list.append(failed)
        return returned_list
    else:
        return 'Invalid Input'


print(partition([1, 2, 3, 4], 'is_even'))
print(partition(["hi", None, 6, "bye"], 'is_string'))