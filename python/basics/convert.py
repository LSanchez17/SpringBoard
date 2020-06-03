def convert_temp(unit_in, unit_out, temp):
    """Convert farenheit <-> celsius and return results.

    - unit_in: either "f" or "c" 
    - unit_out: either "f" or "c"
    - temp: temperature (in f or c, depending on unit_in)

    Return results of conversion, if any.

    If unit_in or unit_out are invalid, return "Invalid unit [UNIT_IN]".

    For example:
      convert_temp("c", "f", 0)  =>  32.0
      convert_temp("f", "c", 212) => 100.0
    """

    # YOUR CODE HERE
    message = ''
    if unit_in == 'f':
        if unit_out == 'c':
            temp = (temp - 32) * (5/9)
            message = f' {unit_in} Converted to {unit_out} is equal to {temp}'
            return message
        elif unit_out == 'f':
            message = f' {unit_in} Converted to {unit_out} is equal to {temp}'
            return message
        else:
            message = f'Invalid {unit_out}'
            return message
    elif unit_in == 'c':
        if unit_out == 'f':
            temp = (temp * (9/5)) + 32
            message = f' {unit_in} Converted to {unit_out} is equal to {temp}'
            return message
        elif unit_out == 'c':
            message = f' {unit_in} Converted to {unit_out} is equal to {temp}'
            return message
        else:
            message = f' Invalid {unit_out}'
            return message
    else:
        message = f' Invalid Units {unit_in}'
        return message

print(convert_temp("c", "f", 0))
print(convert_temp("f", "c", 212))
print(convert_temp("z", "f", 32)) 
print(convert_temp("c", "z", 32)) 
print(convert_temp("f", "f", 75.5)) 

