def vowel_count(phrase):
    """Return frequency map of vowels, case-insensitive.

        >>> vowel_count('rithm school')
        {'i': 1, 'o': 2}
        
        >>> vowel_count('HOW ARE YOU? i am great!') 
        {'o': 2, 'a': 3, 'e': 2, 'u': 1, 'i': 1}
    """
    vowels = 'aeiou'
    freq = {}

    print(vowels.find('a'))

    for letter in phrase:
        lowered = letter.lower()
        if vowels.find(lowered) != -1:
            if freq.get(lowered):
                freq[lowered] += 1
            else:
                freq[lowered] = 1
    
    return freq

print(vowel_count('rithm school'))
