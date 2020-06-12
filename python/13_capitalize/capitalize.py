def capitalize(phrase):
    """Capitalize first letter of first word of phrase.

        >>> capitalize('python')
        'Python'

        >>> capitalize('only first word')
        'Only first word'
    """
    new_phrase = ''
    for char in phrase:
        new_phrase += char
    
    return new_phrase[0].upper() + new_phrase[1:]

print(capitalize('tomato'))
print(capitalize('kinda too easy'))