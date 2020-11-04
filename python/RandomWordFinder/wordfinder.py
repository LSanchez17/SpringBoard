"""Word Finder: finds random words from a dictionary."""
from random import randrange, random

class WordFinder:

    def __init__(self, filepath = './words.txt'):
        """
        Initializing the class, and reading the word from a file, if none provided
        we use the basic one within the folder
        We return the total number of words and store a list of those words 
        """
        self.list_words = self.words_in_list(filepath)
        print((f'{len(self.list_words)} words read'))

    def words_in_list(self, filepath):
        """
        We then iterate through the reading of the words, saving them to a list and
        returning that list so it's iterable
        """
        lst_words = []
        file = open(filepath)
        for word in file:
            lst_words.append(word.strip('\n'))
        file.close()
        # print(lst_words)
        # print(len(lst_words))
        return lst_words

    def random_word(self):
        """
        Retturns a random word using the pseudorandom number maker
        """
        word_range = len(self.list_words)
        return self.list_words[randrange(0, word_range)]
        

test = WordFinder()
print(test.random_word())
print(test.random_word())


class SpecialWordFinder(WordFinder):
    """
    Extends the parent class, calling the parents super method of reading a file
    This is due to the fact the original already strips new lines
    """
    def special_read(self, filepath = './words.txt'):
        special_words = super(SpecialWordFinder, self).words_in_list(filepath)  
        return len(special_words)

test2 = SpecialWordFinder()
print(test2.special_read())