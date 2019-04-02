import web3 from "./web3";
import CatalystFactory from "./build/CatalystFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CatalystFactory.interface),
  "0xB3d63417c293A4b175f4217FC8B20E0dcD774DD6"
);

export default instance;
