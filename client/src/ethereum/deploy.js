const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CatalystFactory.json");

const provider = new HDWalletProvider(
  /*"enrich tell fury renew call cupboard creek hammer spin vendor pattern goat"*/ "",
  /*"https://rinkeby.infura.io/v3/94be6796f4944aa2adb744c64c70e745"*/ "http://localhost:8501"
); // mnemonic + infura link to rinkeby node
/*const provider = new Web3(
  new Web3.providers.HttpProvider("http://localhost:8501")
);*/

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("attemplting to deploy from account ", accounts[0]);
  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to ", result.options.address);
};

deploy();
