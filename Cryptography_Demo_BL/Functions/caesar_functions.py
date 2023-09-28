import re
import string
from Functions.frequency_functions import *
from Functions.shared_functions import shiftArray
 

reference = ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');


def unshiftArray(
        queue, 
        shiftNum) -> list:
    """
    Reverses the shifting of letters in an array the number of positions provided
    """
    
    lastPos = len(queue) - 1
    i = 0

    while i < shiftNum:
        thisLetter = queue.pop(lastPos)
        queue.insert(0,thisLetter)
        i+=1

    return queue


def encipherCaesar(
        message, 
        shiftNum) -> str:
    """
    Enciphers a plaintext message using a Caesar Shift Cipher
    """

    thisRef = list(reference)
    shiftedRef = shiftArray(thisRef, shiftNum)
    messageOut = ''
    i = 0

    while i < len(message):
        letter = message[i]
        if re.match('[A-Z]', letter):
            index = reference.index(letter)
            messageOut += shiftedRef[index]
        elif re.match('[0-9 ]+', letter):
            messageOut += letter

        i += 1

    return messageOut


def decipherCaesar(
        message, 
        shiftNum) -> str:
    """
    Deciphers ciphertext using a Caesar Shift Cipher
    """

    thisRef = list(reference)
    shiftedRef = shiftArray(thisRef, shiftNum)
    messageOut = ''
    i = 0

    while i < len(message):
        letter = message[i]
        if(re.match('[A-Z]', letter)):
            index = shiftedRef.index(letter)
            messageOut += reference[index]
        else:
            messageOut += letter

        i += 1

    return messageOut


def breakCaesarShift(message):
    letterMatch = find_letter_freq(message)
    cipherIndex = reference.index(letterMatch[0]["cipher"]) 
    plainIndex = reference.index(letterMatch[0]["plain"])
    key = cipherIndex - plainIndex if cipherIndex > plainIndex else 26 - (plainIndex - cipherIndex)
    messageOut = decipherCaesar(message, key)

    return messageOut