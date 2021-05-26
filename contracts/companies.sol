pragma solidity 0.8.4;

contract CompanyData {

  uint public companyCount = 0;

  struct Company {
    uint id;
    uint creationTimestamp;
    address owner;
    string title;
    string description;
    bool active;
  }

  mapping (uint => Company) public companies;

  constructor () {
    //genesis();
  }


  function genesis() public {

    uint currentTime = block.timestamp;

    companies[companyCount] = Company(0, currentTime, msg.sender, "Test company", "E-Corp Lorem Ipsum Potato Potatoe", true);
    companyCount++;
  }


  function addCompany(string memory title, string memory description) public returns(uint){

    uint currentTime = block.timestamp;

    companies[companyCount] = Company(companyCount, currentTime, msg.sender, title, description, true);

    companyCount ++;
    return companyCount;
  }

}
