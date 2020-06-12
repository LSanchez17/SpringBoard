def friend_date(a, b):
    """Given two friends, do they have any hobbies in common?
    - a: friend #1, a tuple of (name, age, list-of-hobbies)
    - b: same, for friend #2
    Returns True if they have any hobbies in common, False is not.
        >>> elmo = ('Elmo', 5, ['hugging', 'being nice'])
        >>> sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
        >>> gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])
        >>> friend_date(elmo, sauron)
        False
        >>> friend_date(sauron, gandalf)
        True
    """
    #List comprehension TIGHTTT, So we loop over initial tuples last element, which is a list
    #Then we run through the other tuple's last element, a list as well, and compare them
    #If they are correct, we add them to the list, and then if the list is not empty, we have common!
    commonality = [items for items in a[-1] for others_items in b[-1] if items == others_items]
    print(commonality)

    if commonality:
        return True
    else:
        return False

elmo = ('Elmo', 5, ['hugging', 'being nice'])
sauron = ('Sauron', 5000, ['killing hobbits', 'chess'])
gandalf = ('Gandalf', 10000, ['waving wands', 'chess'])       

print(friend_date(elmo, sauron))
print(friend_date(sauron, gandalf))