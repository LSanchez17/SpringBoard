def reverse_string(phrase):
    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """
    reversed_phrase = ''
    
    for char in phrase:
        reversed_phrase += char
    
    reversed_phrase = reversed_phrase[::-1]
    print(reversed_phrase)

reverse_string('Risky')
reverse_string('Tomatoes')
reverse_string('Two')