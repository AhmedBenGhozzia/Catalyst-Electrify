import web3 from "./web3";
import CatalystFactory from "./build/CatalystFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CatalystFactory.interface),
  "0xB3d63417c293A4b175f4217FC8B20E0dcD774DD6"  //Rinkeby
  //"0x3e7be99ebceafd71a4d0a903967c53d29b830041" //Local private network
  // "0xe49f39e2383193d42ccc15404a51fd4d4fe0d0de" //AWS private network
);

export default instance;
