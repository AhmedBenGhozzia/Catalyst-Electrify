import Catalyst from "../ethereum/Catalyst";
import web3 from "../ethereum/web3";
import React from "react";
import '../css/MultipleModals.css';


var catalyst;
var totalConsumption;
var totalProduction;
var count;
var keys = [];
var productionHistory;
var consumtionHistory;

async function getTransactions(address) {
  catalyst = address;
  totalConsumption = await Catalyst(catalyst)
    .methods.totalConsumption()
    .call();
  totalProduction = await Catalyst(catalyst)
    .methods.totalProduction()
    .call();
  count = await Catalyst(catalyst)
    .methods.count()
    .call();
  keys = await Catalyst(catalyst)
    .methods.getkeyConsumProd()
    .call();
  productionHistory = await Catalyst(catalyst)
    .methods.getProductionHistory()
    .call();
  consumtionHistory = await Catalyst(catalyst)
    .methods.geConsumtionHistory()
    .call();

  return verifyTransaction(address);
}

async function verifyTransaction(address) {
  console.log(count);
  var date = new Date(+keys[keys.length - 1]);
  var numberOfDay;
  console.log("************");
  console.log(keys);

  let table = [];
  if (new Date().getMonth() === date.getMonth()) {
    numberOfDay = new Date().getDate() - date.getDate();
    console.log(numberOfDay);
    var compteur = numberOfDay - 1;

    for (let index = 0; index < numberOfDay; index++) {
      //Date.parse(new Date()) - compteur * 86400000 //randomIntFromInterval(5, 10000)
      table.push(
        <tr>
          <td> {Date.parse(new Date()) - compteur * 86400000}</td>
          <td className="font-weight-bold" >{randomIntFromInterval(5, 10000)}</td>
          <td className="font-weight-bold">{randomIntFromInterval(5, 10000)}</td>
          <td>
            <button>push</button>
          </td>
        </tr>
      );
      compteur--;
    }
  }
  console.log(address);
  console.log(numberOfDay);
  console.log(table);
  return table;
}

async function addTransaction(date, cons, prod) {
  const accounts = await web3.eth.getAccounts();
  await Catalyst(catalyst)
    .methods.addDay(date, cons, prod)
    .send({ from: accounts[0] });
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default getTransactions;
