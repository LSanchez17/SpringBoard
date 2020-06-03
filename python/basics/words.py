def print_upper_words(list_of_words):
    """This function takes a list and returns words within the list that match the requirements"""
    for words in list_of_words:
        if words[0].lower() == 'e' or words[0].lower() == 'y':
            print(words.upper())

print_upper_words(['hello', 'hey', 'goodbye', 'yo', 'eats', 'every'])