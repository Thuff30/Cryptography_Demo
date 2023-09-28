import operator
import re
from Functions.shared_functions import find_factors 

reference = ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')
lettersByFreq = ('E', 'T', 'A', 'O', 'I', 'N', 'S', 'H', 'R', 'D', 'L', 'C', 'U', 'M', 'W', 'F', 'G', 'Y', 'P', 'B', 'V', 'K', 'J', 'X', 'Q', 'Z')
bigrams = ('TH', 'HE', 'IN', 'ER', 'AN', 'RE', 'ON', 'AT', 'EN', 'ND', 'TI', 'ES', 'OR', 'TE', 'OF', 'ED', 'IS', 'IT', 'AL', 'AR', 'ST', 'TO', 'NT', 'NG', 'SE', 'HA', 'AS', 'OU')
trigrams = ('THE', 'AND', 'THA', 'ENT', 'ING', 'ION', 'TIO', 'FOR', 'NDE', 'HAS', 'NCE', 'EDT', 'TIS', 'OFT', 'STH', 'MEN')

def sortByCount(e):
    return e['count']


def find_letter_freq(message):
    """
    Finds the frequency of all letters in provided ciphertext and pairs them to their most probable plaintext matches
    """

    letterFreq = []
    probableMatches = []
    i = 0

    #Gets an array of dictionaries of all letters and their frequency in the ciphertext
    for letter in reference:
        letterFreq.append({
            "letter": letter,
            "count": len(re.findall(letter, message))
            })

    letterFreq.sort(key=operator.itemgetter('count'), reverse=True)

    arrayLen = len(letterFreq)
    #Matches the dictionaries of letters with their most probable plaintext matches
    while i < arrayLen:
        probableMatches.append({
            "cipher": letterFreq[i]['letter'],
            "plain": lettersByFreq[i]
            })
        i += 1

    return probableMatches


def find_bigram_freq(message):
    """
    Finds the frequency of all bigrams in the provided ciphertext and pairs them to their most probable plaintext matches
    """

    bigramFreq = []
    probableMatches = []
    i = 0
    x = 0
    totalLength = len(message)
    bigramLength = len(bigrams)
    
    #gets an array of dictionaries of all bigrams and their frequency in the ciphertext
    while i < totalLength - 1:
        if re.match('[A-Z]', message[i]) and re.match('[A-Z]', message[i + 1]):
            bigram = message[i] + message[i + 1]
            bigramFreq.append({
                "bigram": bigram,
                "count":  len(re.findall(bigram, message))
                })
            i += 1
        else:
            i += 1
            continue

    #Sort the dictionary by the number of occurences in the ciphertext
    bigramFreq.sort(key=operator.itemgetter('count'), reverse=True)

    arrayLen = len(bigramFreq)
    #Matches the dictionaries of brigrams with their most probable plaintext matches
    while x < arrayLen and x < bigramLength:
        probableMatches.append({
            "cipher": bigramFreq[x]["bigram"],
            "plain": bigrams[x]
            })
        x += 1

    return probableMatches


def find_trigram_freq(message):
    """
    Finds the frequency of all trigrams in the provided ciphertext and pairs them to their most probably plaintext matches
    """

    trigramFreq = []
    probableMatches = []
    i = 0
    x = 0
    totalLength = len(message)
    trigramLength = len(trigrams)

    #Gets an array of dictionaires of all 
    while i < totalLength - 2:
        if re.match('[A-Z]', message[i]) and re.match('[A-Z]', message[i + 1]) and re.match('[A-Z]', message[i + 2]):
            trigram = message[i] + message[i + 1] + message[i + 2]
            trigramFreq.append({
                "trigram": trigram,
                "count": len(re.findall(trigram, message))
                })
            i += 1
        else:
            i += 1
            continue

    trigramFreq.sort(key=operator.itemgetter('count'), reverse=True)

    arrayLen = len(trigramFreq)
    #Matches the dictionaries of trigrams with their most probably plaintext matches
    while x < arrayLen and x < trigramLength:
        probableMatches.append({
            "cipher": trigramFreq[x]["trigram"],
            "plain": trigrams[x]
            })
        x += 1

    return probableMatches


def check_list_for_match(currentMatches, plainLetter, cipherLetter):
    """
    Checks and existing list of dictionaries for an item with at matching plaintext and ciphertext letter 
    """
    match = False

    for letter in currentMatches:
        if letter["plain"] == plainLetter and letter["cipher"] == cipherLetter:
            match = True
            letter["count"] += 1
            break

    if match == False:
        currentMatches.append({
            "cipher": cipherLetter,
            "plain": plainLetter,
            "count": 1
            })

    return currentMatches


def get_final_lettter_freq(letter_match, bigram_match, trigram_match):
    """
    Compares letter, bigram, and trigram frequencies to determine the best probable matches for each letter
    """
    probableMatches = []
    finalLetterMatch = []
    i = 0
    x = 0

    #Transpose letter probable matches to dictionary array
    for letter in letter_match:
        probableMatches.append({
            "cipher": letter["cipher"],
            "plain": letter["plain"],
            "count": 1
            })

    #Add bigram probable matches to dictionary array by letter
    for bigram in bigram_match:
        bi = 0

        while bi < 2:
            probableMatches = check_list_for_match(probableMatches, bigram["plain"][bi], bigram["cipher"][bi])
            bi += 1
    
    for trigram in trigram_match:
        ti = 0

        while ti < 3:
            probableMatches = check_list_for_match(probableMatches, trigram["plain"][ti], trigram["cipher"][ti])
            ti += 1

    while i < 26:
        thisLetterMatches = []

        for letter in probableMatches:
            if letter["plain"] == lettersByFreq[i]:
                thisLetterMatches.append(letter)

        thisLetterMatches.sort(key=operator.itemgetter('count'), reverse=True)
        print(thisLetterMatches)
        finalLetterMatch.append({
            "cipher": thisLetterMatches[0]["cipher"],
            "plain": thisLetterMatches[0]["plain"]
            })
        i += 1

    return finalLetterMatch

def get_shift_value(
        letter_match, 
        bigram_match, 
        trigram_match) -> int:
    """
    
    """
    finalLetterMatch = get_final_lettter_freq(letter_match, bigram_match, trigram_match)

    cipherIndex = reference.index(finalLetterMatch[0]["cipher"]) 
    plainIndex = reference.index(finalLetterMatch[0]["plain"])

    return cipherIndex - plainIndex if cipherIndex > plainIndex else 26 - (plainIndex - cipherIndex)

def nth_gram_freq_analysis(
        message, 
        degree) -> list:
    """
    Performs an nth gram frequency analysis of a string
    """

    i = 0
    d = 1
    special_check = False
    gram_freq = []
    gram_array = []
    total_length = len(message) - (degree - 1)

    while i < total_length:
        special_pos = 1
        if re.match('[A-Z]', message[i]):
            gram = message[i]
            while d < degree:
                this_letter += message[i + d]
                if re.match('[A-Z]', this_letter):
                    gram += this_letter
                    d += 1
                else:
                    special_check = True
                    special_pos = d + 1
                    break
                
            if special_check == False and special_pos == 1:
                gram_array.append({
                    "gram": gram,
                    "pos": i
                    })

        i += special_pos

    for gram in gram_array:
        skip = False
        for freq in gram_freq:
            if freq["gram"] == gram["gram"]:
                freq["pos"].append(gram["pos"])
                skip = True
                break

        if skip == False:
            gram_freq.append({
                "gram": gram,
                "count": gram_array.count(gram),
                "pos": [gram["pos"]]
                })

    gram_freq.sort(key=operator.itemgetter('count'), reverse=True)

    return gram_freq

def kasiski_analysis(message):
    gram_freq = nth_gram_freq_analysis(message, 3) + nth_gram_freq_analysis(message, 4)

    for gram in gram_freq:
        if gram["count"] > 1:
            p = 0
            d = 1
            diffs = []
            is_match = True
            while p < len(gram["pos"]) - 1:
                diffs.append(gram["pos"][p + 1] - gram["pos"][p] )
                p += 1

            while d < len(diffs):
                if diffs[d] != diffs[d - 1]:
                    is_match = False
                d += 1

            if is_match:
                gram["factors"] = find_factors(diffs[0])

