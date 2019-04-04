import web3 from "./web3";
import Catalyst from "./build/Catalyst";

export default address => {
  return new web3.eth.Contract(JSON.parse(Catalyst.interface), address);
};
