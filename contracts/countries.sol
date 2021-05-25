pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract CountryData {

  uint public countryCount = 0;

  struct Country {
    uint id;
    string country;
    uint totalCO2 ;
    uint perCapCO2;
    uint envPerfIndex;
    uint envHealth;
    uint ecoVitality;
    uint changes;
    uint editTime;
  }

  //uint == ID
  mapping (uint => Country) public countries;
  mapping (string => Country[]) public history;

  constructor () public {
    //genesis();
  }


  function genesis() public {

    uint currentTime = now;

    countries[countryCount] = Country(0, "America", 100, 99, 98, 97, 96, 0, currentTime);
    countryCount++;
  }


  function addCountry(string memory name, uint total, uint perCap, uint EPI, uint EH, uint EV) public {

    uint currentTime = now;

    countries[countryCount] = Country(countryCount, name, total, perCap, EPI, EH, EV, 0, currentTime);

    countryCount ++;

  }

  function updateCountry(uint id, string memory name, uint total, uint perCap, uint EPI, uint EH, uint EV) public {

    uint oldCO2 = countries[id].totalCO2;
    uint oldPerCap = countries[id].perCapCO2;
    uint oldEPI = countries[id].envPerfIndex;
    uint oldEH = countries[id].envHealth;
    uint oldEV = countries[id].ecoVitality;

    storeOldCountry(id, name, oldCO2, oldPerCap, oldEPI, oldEH, oldEV);

    //countries[id] = Country(id, name, total, perCap, EPI, EH, EV, numRevisions, currentTime );
    storeNewCountry(id, name, total, perCap, EPI, EH, EV);
  }

  function storeNewCountry(uint id, string memory name, uint total, uint perCap, uint EPI, uint EH, uint EV) private {

    uint currentTime = now;
    uint numRevisions = (countries[id].changes + 1);

    countries[id] = Country(id, name, total, perCap, EPI, EH, EV, numRevisions, currentTime );
  }

  function storeOldCountry(uint id, string memory name, uint oldTotal, uint oldPerCap, uint oldEPI, uint oldEH, uint oldEV) private {

    Country memory countryHistory = Country(id, name, oldTotal, oldPerCap, oldEPI, oldEH, oldEV, countries[id].changes, countries[id].editTime);

    history[name].push(countryHistory);

  }

  function returnCountryCount (uint id) public view returns (uint) {

    uint editCount = countries[id].changes;

    return editCount;
  }


  function returnCountry (uint index, string memory name) public view returns (Country memory) {

    return history[name][index];
  }

}
