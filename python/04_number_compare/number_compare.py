def number_compare(a, b):
    """Report on whether a>b, b>a, or b==a
    
        >>> number_compare(1, 1)
        'Numbers are equal'
        
        >>> number_compare(-1, 1)
        'Second is greater'
        
        >>> number_compare(1, -2)
        'First is greater'
    """
    # if type(a) == 'String' or type(b) == 'String':
    #     return None

    if a > b:
        print(f'{a} is greater than {b}')
    elif b > a:
        print(f'{b} is greater than {a}')
    else:
        print(f'{a} & {b} are equal')

number_compare(1,1)
number_compare(2,1)
number_compare(3,1)
# number_compare('tot',1)