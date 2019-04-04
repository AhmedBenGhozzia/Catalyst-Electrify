import Web3 from "web3";

let web3js;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //we are in a browser + metamask
  web3js = new Web3(window.web3.currentProvider);
} else {
  // we are on the server Or the user don't have metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/94be6796f4944aa2adb744c64c70e745"
  );
  web3js = new Web3(provider);
}

export default web3js;
