def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
        >>> same_frequency(551122, 221515)
        True
        >>> same_frequency(321142, 3212215)
        False
        >>> same_frequency(1212, 2211)
        True
    """
    frequency = None
    lst_one = [int(n) for n in str(num1)]
    lst_two = [int(n) for n in str(num2)]
    lst_one.sort()
    lst_two.sort()
    
    if lst_one == lst_two:
        return True
    else:
        return False

print(same_frequency(551122,221515))
print(same_frequency(321142,3212215))