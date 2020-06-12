def sum_floats(nums):
    """Return sum of floating point numbers in nums.
    
        >>> sum_floats([1.5, 2.4, 'awesome', [], 1])
        3.9
        
        >>> sum_floats([1, 2, 3])
        0
    """

    # hint: to find out if something is a float, you should use the
    # "isinstance" function --- research how to use this to find out
    # if something is a float!
    totals = [num for num in nums if type(num) == float]
    sum_of_totals = 0

    for n in totals:
        sum_of_totals+=n


    return sum_of_totals

print(sum_floats([1.5, 2.4, 'awesome', [], 1]))