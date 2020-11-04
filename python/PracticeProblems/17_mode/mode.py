def mode(nums):
    """Return most-common number in list.
    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.
        >>> mode([1, 2, 1])
        1
        >>> mode([2, 2, 3, 3, 2])
        2
    """
    most_common = {}
    tick = 0
    final_mode = 0

    for num in nums:
        most_common[num] = most_common.get(num, 0) + 1
        if most_common[num] >= tick:
            tick = most_common[num]
            final_mode = num
    
    
    return final_mode
print(mode([1, 2, 1]))
print( mode([2, 2, 3, 3, 2]))