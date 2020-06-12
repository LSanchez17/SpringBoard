def compact(lst):
    """Return a copy of lst with non-true elements removed.

        >>> compact([0, 1, 2, '', [], False, (), None, 'All done'])
        [1, 2, 'All done']
    """
    new_list = [item for item in lst if item]
    return new_list

print(compact([0, 1, 2, '', [], False, (), None, 'All done']))