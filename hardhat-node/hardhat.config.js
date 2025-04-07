require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      mining: {
        auto: true,
        interval: 5000
      }
    }
  }
};