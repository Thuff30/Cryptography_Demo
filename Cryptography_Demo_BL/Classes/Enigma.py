from pydoc import plain
from Functions.shared_functions import shiftArray, find_dictionary

reference = ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z')

class Enigma(object):
    """Simulates the German WW2 Kreigsmarine Enigma"""


    #region Assignment Methods


    def _assign_walzen(rotor_num: int) -> list:
        """
        Populates a list with the appropriate wiring based on the selected rotor
        """
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

    
    def _populate_queue(
            self, 
            rotor_num: int) -> list:
        """
        Generates a list of dictionaries to represent the wiring in walzen
        """

        walzen = []
        arr = self._assign_walzen(rotor_num)
        i = 0

        while i < len(arr):
            walzen.append({
                "key": reference[i],
                "value": arr[i]
                })
            i += 1

        return walzen


    def _walzen_wende(
            self, 
            walzenlage: list) -> list:
        """
        Determines the point at which a walzen triggers the next walzen to turn
        """

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


    def _assign_umkehrwalze(umkerwalze_choice: str) -> list:
        """
        Determines the wiring pattern for the umkerwalze
        """
        
        umkehrwalze = []
        if umkerwalze_choice == 'B':
            umkehrwalze = ['Y', 'R', 'U', 'H', 'Q', 'S', 'L', 'D', 'P', 'X', 'N', 'G', 'O', 'K', 'M', 'I', 'E', 'B', 'F', 'Z', 'C', 'W', 'V', 'J', 'A', 'T']
        elif umkerwalze_choice == 'C':
            umkehrwalze = ['F', 'V', 'P', 'J', 'I', 'A', 'O', 'Y', 'E', 'D', 'R', 'Z', 'X', 'W', 'G', 'C', 'T', 'K', 'U', 'Q', 'S', 'B', 'N', 'M', 'H', 'L']
        
        return umkehrwalze


    def _steckerverbindungen(steckerbrett: list) -> list:
        """
        Generates alist of dictionaries to represent the Steckerbrett connections
        """

        stecker = []
        i = 0

        for pair in steckerbrett:
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


    def _remove_punctuation(plaintext: str) -> str:
        """
        Replaces all puntuation with bigrams as outlined in Enigma SOPs
        """

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


    def _add_punctuation(ciphertext: str) -> str:
        """
        Replaces all pretedertimed bigrams with punctuation as outlined in the Enigma SOPs
        """

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


    def _shift_walzen(self):
        """Shifts rotors forward one position"""



    def _process_message(self, message: str) -> str:
        """Processes a message using the Enigma object's settings"""

        message = message.replace(" ", "")

        for letter in message:
            


    def encipher(
        self, 
        plaintext: str) -> str:
        """
        Enciphers plaintext using the current Enigma settings
        """

        ciphertext = self._remove_punctuation(plaintext)

    def __init__(self, walzenlage: list, grundstellung: list, umkehrwalze_choice: str, steckerbrett: list):
        self.walzenlage = walzenlage
        self.walzen1 = shiftArray(self._populate_queue(walzenlage[0]), grundstellung[0])
        self.walzen2 = shiftArray(self._populate_queue(walzenlage[1]), grundstellung[1])
        self.walzen3 = shiftArray(self._populate_queue(walzenlage[2]), grundstellung[2])
        self.turnover = self._walzen_wende(walzenlage)
        self.positions = grundstellung
        self.umkerwalze = self._assign_umkehrwalze(umkehrwalze_choice)
        self.steckerbrett = self._steckerverbindungen(steckerbrett)