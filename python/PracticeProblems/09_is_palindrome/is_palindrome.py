def is_palindrome(phrase):
    """Is phrase a palindrome?
    Return True/False if phrase is a palindrome (same read backwards and
    forwards).
        >>> is_palindrome('noon')
        True
        >>> is_palindrome('robert')
        False
    Should ignore capitalization/spaces when deciding:
        >>> is_palindrome('taco cat')
        True
        >>> is_palindrome('Noon')
        True
    """
    phrase = phrase.lower()
    backwards = ''

    print(phrase)

    for char in phrase:
        backwards += char
    
    backwards = backwards[::-1]

    if phrase == backwards:
        return True
    else:
        return False

print(is_palindrome('Noon'))
print(is_palindrome('true'))
