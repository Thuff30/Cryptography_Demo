reference = ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

def shiftArray(
        queue: list, 
        shiftNum: int) -> list:
    """ Shifts the letters in an array number of positions provided """

    lastPos = len(queue) - 1
    i = 0

    while i < shiftNum:
        thisLetter = queue.pop(0)
        queue.insert(lastPos,thisLetter)
        i+=1

    return queue

def find_factors(num: int) -> list : 
    """ Finds all factors of the provided integer """
    factors = []

    for i in range(1, num + 1):
        if num % i == 0:
            factors.append(i)

    return factors

def find_dictionary(
        list_in: list, 
        key_name : str, 
        value) -> dict:
    """ Finds a dictionary in a list of dictionaries based on a specified value """
    
    result = {}
    for item in list_in:
        if item[key_name] == value:
            result = item

    return result

def find_dict_index(
        list_in: list,
        key_name: str,
        key: str) -> int:
    """ Finds the index of a dictionary in a list of dictionaries based on the key """

    pos = 0

    for entry in list_in:
        if entry[key_name] == key:
            break
        pos += 1

    return pos