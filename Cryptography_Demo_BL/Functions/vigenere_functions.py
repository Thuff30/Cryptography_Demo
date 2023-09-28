from Functions.shared_functions import shiftArray
import re

reference = ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')


def getKeyString(
        input_string, 
        key) -> str:
    input_length = len(input_string)
    repititions = (input_length / len(key)) + 1
    key_string = ''
    final_string = ''
    i = 0
    x = 0

    while i < repititions:
        key_string += key
        i += 1
    
    for letter in input_string:
        if re.match('[A-Z]', letter):
            final_string += key_string[x]
            x += 1
        else:
            final_string += letter

    return final_string
    

def generateTabulaRecta() -> list:
    tabulaRecta = []
    tabulaRecta.append(list(reference))
    i = 1

    while i < 26:
        tabulaRecta.append(shiftArray(list(reference), i))
        i += 1

    return tabulaRecta


def encipherVigenere(
        plainText, 
        key) -> str:
    tabulaRecta = generateTabulaRecta()
    keyString = getKeyString(plainText, key)
    i = 0
    cipherText = ''

    while i < len(plainText):
        if re.match('[A-Z]', plainText[i]):
            cipherText += tabulaRecta[reference.index(plainText[i])][reference.index(keyString[i])]
        else:
            cipherText += plainText[i]
        i += 1

    return cipherText

def decipherVigenere(
        cipherText,
        key) -> str:
    tabulaRecta = generateTabulaRecta()
    keyString = getKeyString(cipherText, key)
    i = 0
    plainText = ''
    while i < len(cipherText):
        if re.match('[A-Z]', cipherText[i]):
            row = tabulaRecta[reference.index(keyString[i])]
            plainText += reference[row.index(cipherText[i])]
        else:
            plainText += cipherText[i]
        i += 1

    return plainText