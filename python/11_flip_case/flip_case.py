def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.
        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'
        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'
        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'
    """
    # print(phrase[phrase.find(to_swap)].upper())
    # print(phrase)
    new_phrase = ''
    for char in phrase:
        if char == to_swap.upper():
            new_phrase += char.lower()
        elif char == to_swap:
            new_phrase += char.upper()
        else:
            new_phrase += char
    return new_phrase

print(flip_case('Too', 'o'))
print(flip_case('This IS A TESSSS', 's'))