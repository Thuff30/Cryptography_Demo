import re
from Functions.shared_functions import find_dict_index, shiftArray, find_dictionary

reference = ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')

class Enigma(object):
    """Simulates the German WW2 Kreigsmarine Enigma"""


    #region Assignment Methods


    def __assign_walzen(
            self, 
            rotor_num: int) -> list:
        """Populates a list with the appropriate wiring based on the selected rotor"""
        wiring = []
        if rotor_num == 1:
           wiring = ['E', 'K', 'M', 'F', 'L', 'G', 'D', 'Q', 'V', 'Z', 'N', 'T', 'O', 'W', 'Y', 'H', 'X', 'U', 'S', 'P', 'A', 'I', 'B', 'R', 'C', 'J']
        elif rotor_num == 2:
            wiring = ['A', 'J', 'D', 'K', 'S', 'I', 'R', 'U', 'X', 'B', 'L', 'H', 'W', 'T', 'M', 'C', 'Q', 'G', 'Z', 'N', 'P', 'Y', 'F', 'V', 'O', 'E']
        elif rotor_num == 3:
            wiring = ['B', 'D', 'F', 'H', 'J', 'L', 'C', 'P', 'R', 'T', 'X', 'V', 'Z', 'N', 'Y', 'E', 'I', 'W', 'G', 'A', 'K', 'M', 'U', 'S', 'Q', 'O']
        elif rotor_num == 4:
            wiring = ['E', 'S', 'O', 'V', 'P', 'Z', 'J', 'A', 'Y', 'Q', 'U', 'I', 'R', 'H', 'X', 'L', 'N', 'F', 'T', 'G', 'K', 'D', 'C', 'M', 'W', 'B']
        elif rotor_num == 5:
            wiring = ['V', 'Z', 'B', 'R', 'G', 'I', 'T', 'Y', 'U', 'P', 'S', 'D', 'N', 'H', 'L', 'X', 'A', 'W', 'M', 'J', 'Q', 'O', 'F', 'E', 'C', 'K']
        elif rotor_num == 6:
            wiring = ['J', 'P', 'G', 'V', 'O', 'U', 'M', 'F', 'Y', 'Q', 'B', 'E', 'N', 'H', 'Z', 'R', 'D', 'K', 'A', 'S', 'X', 'L', 'I', 'C', 'T', 'W']
        elif rotor_num == 7:
            wiring = ['N', 'Z', 'J', 'H', 'G', 'R', 'C', 'X', 'M', 'Y', 'S', 'W', 'B', 'O', 'U', 'F', 'A', 'I', 'V', 'L', 'P', 'E', 'K', 'Q', 'D', 'T']
        elif rotor_num == 8:
            wiring = ['F', 'K', 'Q', 'H', 'T', 'L', 'X', 'O', 'C', 'B', 'J', 'S', 'P', 'D', 'Z', 'R', 'A', 'M', 'E', 'W', 'N', 'I', 'U', 'Y', 'G', 'V']
        
        return wiring

    
    def __populate_queue(
            self, 
            rotor_num: int) -> list:
        """Generates a list of dictionaries to represent the wiring in walzen"""

        walzen = []
        arr = self.__assign_walzen(rotor_num)
        i = 0

        while i < len(arr):
            walzen.append({
                "key": reference[i],
                "value": arr[i]
                })
            i += 1

        return walzen


    def __walzen_wende(
            self, 
            walzenlage: list) -> list:
        """Determines the point at which a walzen triggers the next walzen to turn"""

        turnover = []
        for walzen in walzenlage:
            num = 0
            if walzen == 1:
                num = 17
            elif walzen == 2:
                num = 5
            elif walzen == 3:
                num = 22
            elif walzen == 4:
                num = 10
            elif walzen == 5:
                num = 0
            elif walzen == 6 or walzen == 7 or walzen == 8:
                num = 13
            
            turnover.append({
                "key": walzen,
                "value": num
                })

        return turnover


    def __assign_umkehrwalze(
            self, 
            umkerwalze_choice: str) -> list:
        """Determines the wiring pattern for the umkerwalze"""
        
        umkehrwalze = []
        if umkerwalze_choice == 'B':
            umkehrwalze = ['Y', 'R', 'U', 'H', 'Q', 'S', 'L', 'D', 'P', 'X', 'N', 'G', 'O', 'K', 'M', 'I', 'E', 'B', 'F', 'Z', 'C', 'W', 'V', 'J', 'A', 'T']
        elif umkerwalze_choice == 'C':
            umkehrwalze = ['F', 'V', 'P', 'J', 'I', 'A', 'O', 'Y', 'E', 'D', 'R', 'Z', 'X', 'W', 'G', 'C', 'T', 'K', 'U', 'Q', 'S', 'B', 'N', 'M', 'H', 'L']
        
        return umkehrwalze


    def __steckerverbindungen(
            self, 
            steckerbrett: list) -> list:
        """Generates alist of dictionaries to represent the Steckerbrett connections"""

        stecker = []
        i = 0

        for pair in steckerbrett:
            if pair['value'] != '':
                stecker.append({
                    "key": pair["key"],
                    "value": reference.index(pair["value"])
                    })

        while i < len(reference):
            check = find_dictionary(stecker, "key", reference[i])
            if not bool(check):
                stecker.append({
                    "key": reference[i],
                    "value": i
                    })
            i += 1

        return stecker
    

    #endregion


    #region Message Preparation Methods


    def __remove_punctuation(
            self, 
            plaintext: str) -> str:
        """Replaces all puntuation with bigrams as outlined in Enigma SOPs"""

        plaintext = plaintext.replace(".", "BX")
        plaintext = plaintext.replace(",", "YB")
        plaintext = plaintext.replace("?", "QD")
        plaintext = plaintext.replace(":", "XX")
        plaintext = plaintext.replace(";", "XJ")
        plaintext = plaintext.replace("-", "VQ")
        plaintext = plaintext.replace("/", "DX")
        plaintext = plaintext.replace("\\", "CX")
        plaintext = plaintext.replace("(", "KQ")
        plaintext = plaintext.replace(")", "KX")

        return plaintext


    def __add_punctuation(
            self,
            ciphertext: str) -> str:
        """Replaces all pretedertimed bigrams with punctuation as outlined in the Enigma SOPs"""

        ciphertext = ciphertext.replace("BX", ".")
        ciphertext = ciphertext.replace("YB", ",")
        ciphertext = ciphertext.replace("QD", "?")
        ciphertext = ciphertext.replace("XX", ":")
        ciphertext = ciphertext.replace("XJ", ";")
        ciphertext = ciphertext.replace("VQ", "-")
        ciphertext = ciphertext.replace("DX", "/")
        ciphertext = ciphertext.replace("CX", "\\")
        ciphertext = ciphertext.replace("KQ", "(")
        ciphertext = ciphertext.replace("KX", ")")

        return ciphertext


    #endregion


    #region Message Processing Methods


    def __shift_walzen(self):
        """Shifts rotors forward one position"""

        last_pos = 25
        
        temp_num = self.walzen1.pop(0)
        self.walzen1.insert(last_pos, temp_num)
        
        if self.positions[0] < 25:
            self.positions[0] += 1
        else:
            self.positions[0] = 0

        notch = find_dictionary(self.turnover, 'key', self.walzenlage[0])['value']

        if self.positions[0] == notch:
            temp_num = self.walzen2.pop(0)
            self.walzen2.insert(last_pos, temp_num)

            if self.positions[1] < 25:
                self.positions[1] += 1
            else:
                self.positions[1] = 0

            notch = find_dictionary(self.turnover, 'key', self.walzenlage[1])['value']
            
            if self.positions[1] == notch:
                temp_num = self.walzen3.pop(0)
                self.walzen3.insert(last_pos, temp_num)

        return


    def __process_message(
            self, 
            message: str) -> str:
        """Processes a message using the Enigma object's settings"""

        messageOut = ''
        message = message.replace(" ", "")
        pos = 0

        for letter in message:
            self.__shift_walzen()

            if re.match('[A-Z]', letter):
                #pass the letter through the steckerbrett, walzen, and umkehrwalzen
                temp_value = find_dictionary(self.steckerbrett, 'key', letter)['value']
                temp_value2 = self.walzen1[temp_value]['value']
                temp_value = find_dict_index(self.walzen1, 'key', temp_value2)
                temp_value2 = self.walzen2[temp_value]['value']
                temp_value = find_dict_index(self.walzen2, 'key', temp_value2)
                temp_value2 = self.walzen3[temp_value]['value']
                temp_value = find_dict_index(self.walzen3, 'key', temp_value2)
                temp_value2 = self.umkerwalze[temp_value]

                #pass the letter back through the walzen and steckerbrett
                temp_value = reference.index(temp_value2)
                temp_value2 = self.walzen3[temp_value]['key']
                temp_value3 = find_dictionary(self.walzen3, 'value', temp_value2)['key']
                temp_value = find_dict_index(self.walzen3, 'key', temp_value3)
                temp_value2 = self.walzen2[temp_value]['key']
                temp_value3 = find_dictionary(self.walzen2, 'value', temp_value2)['key']
                temp_value = find_dict_index(self.walzen2, 'key', temp_value3)
                temp_value2 = self.walzen1[temp_value]['key']
                temp_value3 = find_dictionary(self.walzen1, 'value', temp_value2)['key']
                temp_value = find_dict_index(self.walzen1, 'key', temp_value3)
                
                messageOut += find_dictionary(self.steckerbrett, 'value', temp_value)['key']

                #add a space every 5 letters to avoid word length analysis and increase difficulty of nth gram analysis
                pos += 1
                if pos % 5 == 0:
                    messageOut += ' '

        return messageOut


    def encipher(
        self, 
        plaintext: str) -> str:
        """Enciphers plaintext using the current Enigma settings"""

        plaintext = self.__remove_punctuation(plaintext)
        return self.__process_message(plaintext)


    def decipher(
        self,
        ciphertext: str) -> str:
        """Deciphers ciphertext using current Enigma settings"""

        ciphertext = self.__add_punctuation(ciphertext)
        return self.__process_message(ciphertext)


    #endregion


    def __init__(self, walzenlage: list, grundstellung: list, umkehrwalze_choice: str, steckerbrett: list):
        self.walzenlage = walzenlage
        self.walzen1 = shiftArray(self.__populate_queue(walzenlage[0]), grundstellung[0])
        self.walzen2 = shiftArray(self.__populate_queue(walzenlage[1]), grundstellung[1])
        self.walzen3 = shiftArray(self.__populate_queue(walzenlage[2]), grundstellung[2])
        self.turnover = self.__walzen_wende(walzenlage)
        self.positions = grundstellung
        self.umkerwalze = self.__assign_umkehrwalze(umkehrwalze_choice)
        self.steckerbrett = self.__steckerverbindungen(steckerbrett)