def frequency(lst, search_term):
    """Return frequency of term in lst.
        >>> frequency([1, 4, 3, 4, 4], 4)
        3
        >>> frequency([1, 4, 3], 7)
        0
    """
    freq = lst.count(search_term)
    return freq

print(frequency([1,2,3], 2))
print(frequency([1,2,3,4,4,4,4,5,6], 4))
print(frequency([1,3,4],0))
