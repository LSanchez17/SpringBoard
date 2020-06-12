def list_check(lst):
    """Are all items in lst a list?

        >>> list_check([[1], [2, 3]])
        True

        >>> list_check([[1], "nope"])
        False
    """
    check_em = [collection for collection in lst if type(collection) == list]
    
    if len(check_em) == len(lst):
        return True
    else:
        return False

print( list_check([[1], [2, 3]]))
print( list_check([[1], 'test']))
