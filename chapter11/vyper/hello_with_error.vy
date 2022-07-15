greeting: public(bytes[32])

@public
def __init__():
    self.greeting = "Hello, World."
    
@public
@constant
def printGreeting() -> bytes[32]:
    return self.greeting

@public
def setGreeting(_greeting: bytes[32]):
    self.greeting = _greeting