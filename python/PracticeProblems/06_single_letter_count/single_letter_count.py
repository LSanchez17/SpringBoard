def single_letter_count(word, letter):
    """How many times does letter appear in word (case-insensitively)?
        >>> single_letter_count('Hello World', 'h')
        1
        >>> single_letter_count('Hello World', 'z')
        0
        >>> single_letter_count("Hello World", 'l')
        3
    """
    letter_list = []
    appearance = 0

    for char in word:
        letter_list.append(char.lower())

    appearance = letter_list.count(letter)
    print(appearance)


single_letter_count('Hello World', 'h')
single_letter_count('Hello World', 'z')
single_letter_count('Hello World', 'l')
