var Jobs = artifacts.require("JobData");
var Companies = artifacts.require("CompanyData");

module.exports = function(deployer) {
  deployer.deploy(Jobs);
  deployer.deploy(Companies);
};
