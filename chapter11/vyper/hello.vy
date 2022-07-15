# @version ^0.2.15
greeting: public(String[100]) # defining greeting state variable Fixed-size strings - String[100], just like Solidity

@external
def __init__(): # initialization function, similar to Solidity's constructor function
    self.greeting = "Hello, World."
    
@external # annotate that function is public and  can be called from outside
@view # marked as view, function will not change state
def printGreeting() -> String[100]:
    return self.greeting

@external
def setGreeting(_greeting: String[100]): # a state changing function
    self.greeting = _greeting