pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

contract JobData {

  uint public jobCount = 0;

  struct Job {
    uint id;
    uint creationTimestamp;
    address owner;
    string title;
    string description;
    bool active;
    address[] workers;
  }

  //uint == ID
  mapping (uint => Job) public jobs;

  constructor () {
    //genesis();
  }


  function genesis() public {

    uint currentTime = block.timestamp;

    jobs[jobCount] = Job(0, currentTime, msg.sender, "Test job", "Lorem Ipsum Potato Potatoe", true, new address[](0));
    jobCount++;
  }


  function addJob(string memory title, string memory description) public returns(uint){

    uint currentTime = block.timestamp;

    jobs[jobCount] = Job(jobCount, currentTime, msg.sender, title, description, true, new address[](0));

    jobCount ++;
    return jobCount;
  }

  // function updateJob(uint id, string memory name, uint total, uint perCap, uint EPI, uint EH, uint EV) public {

  //   uint oldCO2 = countries[id].totalCO2;
  //   uint oldPerCap = countries[id].perCapCO2;
  //   uint oldEPI = countries[id].envPerfIndex;
  //   uint oldEH = countries[id].envHealth;
  //   uint oldEV = countries[id].ecoVitality;

  //   storeOldCountry(id, name, oldCO2, oldPerCap, oldEPI, oldEH, oldEV);

  //   //countries[id] = Country(id, name, total, perCap, EPI, EH, EV, numRevisions, currentTime );
  //   storeNewCountry(id, name, total, perCap, EPI, EH, EV);
  // }

  // function storeNewCountry(uint id, string memory name, uint total, uint perCap, uint EPI, uint EH, uint EV) private {

  //   uint currentTime = now;
  //   uint numRevisions = (countries[id].changes + 1);

  //   countries[id] = Country(id, name, total, perCap, EPI, EH, EV, numRevisions, currentTime );
  // }

  // function storeOldCountry(uint id, string memory name, uint oldTotal, uint oldPerCap, uint oldEPI, uint oldEH, uint oldEV) private {

  //   Country memory countryHistory = Country(id, name, oldTotal, oldPerCap, oldEPI, oldEH, oldEV, countries[id].changes, countries[id].editTime);

  //   history[name].push(countryHistory);

  // }

  // function returnCountryCount (uint id) public view returns (uint) {

  //   uint editCount = countries[id].changes;

  //   return editCount;
  // }


  // function returnJob (uint index, string memory name) public view returns (Job memory) {

  //   return history[name][index];
  // }

}
