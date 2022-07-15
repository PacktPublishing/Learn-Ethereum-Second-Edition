// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

/// @Organizaion use openzeppelin AccessControl for user role control
/// @author brian

contract Organizaion is AccessControl {
   /**
    * A constant role name for indicating employee.
    */
    bytes32 private constant EMPLOYEE_ROLE = keccak256("EMPLOYEE_ROLE");
    event RoleAdded(address indexed userAddress, bytes32 role);
    event RoleRevoked(address indexed userAddress, bytes32 role);

    /**
    * @dev constructor. Grant root address as admin role by default
    */
    constructor (address root) {
        _setupRole(DEFAULT_ADMIN_ROLE, root);
        _setRoleAdmin(EMPLOYEE_ROLE, DEFAULT_ADMIN_ROLE);
    }
    /**
    * @dev modifier to scope access to admins
    * // reverts
    */
    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Restricted to admin.");
        _;
    }
    /**
    * @dev add an employee role to an account
    * @param account the account that will have the employee role
    */
    function addEmployee(address account) public virtual onlyAdmin {
       grantRole(EMPLOYEE_ROLE, account);
       emit RoleAdded(account,EMPLOYEE_ROLE);
    }
    /**
    * @dev remove an employee role from an account
    * @param account the account that will remove the employee role
    */
    function removeEmployee(address account) public virtual onlyAdmin {
       revokeRole(EMPLOYEE_ROLE, account);
       emit RoleRevoked(account, EMPLOYEE_ROLE);
    }
    /**
     * @dev return true if the account is admin, false otherwise
     */
    function isAdmin(address account)  public virtual view returns (bool) {
       return hasRole(DEFAULT_ADMIN_ROLE, account);
    }
    /**
     * @dev return true if the account is employee, false otherwise
     */
    function isEmployee(address account)  public virtual view returns (bool) {
        return hasRole(EMPLOYEE_ROLE, account);
    }
}