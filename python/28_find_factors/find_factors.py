def find_factors(num):
    """Find factors of num, in increasing order.
    >>> find_factors(10)
    [1, 2, 5, 10]
    >>> find_factors(11)
    [1, 11]
    >>> find_factors(111)
    [1, 3, 37, 111]
    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    factors = []
    long_range = num

    for n in range(1,long_range+1):
        if long_range % n == 0:
            factors.append(n)
    
    return factors

print(find_factors(111))
