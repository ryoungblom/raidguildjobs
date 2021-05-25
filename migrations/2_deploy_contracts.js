var Countries = artifacts.require("CountryData");
var Companies = artifacts.require("CompanyData");

module.exports = function(deployer) {
  deployer.deploy(Countries);
  deployer.deploy(Companies);
};
