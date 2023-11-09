
### [Packt Conference : Put Generative AI to work on Oct 11-13 (Virtual)](https://packt.link/JGIEY)

<b><p align='center'>[![Packt Conference](https://hub.packtpub.com/wp-content/uploads/2023/08/put-generative-ai-to-work-packt.png)](https://packt.link/JGIEY)</p></b> 
3 Days, 20+ AI Experts, 25+ Workshops and Power Talks 

Code: <b>USD75OFF</b>

# Learn-Ethereum-Second-Edition

## Errata
* Page 388: The _function removeAdmin_ should be:
  ```
  function removeAdmin(address account) external onlyOwner {
    require(account != address(0) && admins[account]);
    admins[account] = false;
  }
```
