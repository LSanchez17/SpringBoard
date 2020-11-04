"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    
    def __init__(self, start = 0):
        """ We intialize the class itself here, at start at 0, if given no parameter
            We also save a copy of the initial number in case we want to restart the serialization 
        """
        self.start = start
        self.copy_of_start = start
    
    def __repr__(self):
        """
           Show definition of class
        """

        return f'<SerialGenerator start={self.start} next={self.start + 1}>'
    
    def generate(self):
        """
           We then print the number given to us, and after that, we increment its value by one
           Then upon further calls, the number goes up in sequential order
        """
        print(self.start)
        self.start += 1
        
    
    def reset(self):
        """
           We create a method to reset the current serialization count to the original number given
        """
        self.start = self.copy_of_start



