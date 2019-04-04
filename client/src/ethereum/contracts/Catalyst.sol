pragma solidity ^0.4.25;


contract CatalystFactory{
   Catalyst[] public deployedCatalyst;
   function createCatalyst() public {
      Catalyst newCatalyst = new Catalyst(msg.sender);
      deployedCatalyst.push(newCatalyst);
      }
   function getDeployedCatalyst() public view returns (Catalyst[] memory){
      return deployedCatalyst;
      }    
}

contract Catalyst {
    

	address public user;
	uint public count;
	uint[] keys;
	uint[] productionHistory;
	uint[] consumtionHistory;
	uint public totalConsumption;
	uint public totalProduction;

	constructor(address creator) public {
        user = creator;
    	}

   
	modifier restricted() {
	require(msg.sender == user);
	_;
	}

	function addDay(uint d , uint consumption, uint production)
	public restricted {
	
	count++;
	consumtionHistory.push(consumption)  ;
	productionHistory.push(production);
	keys.push(d);
	totalConsumption += consumption;
	totalProduction += production;
	
	
	}
	
	function getkeyConsumProd() public view returns (uint[] memory){
	    return keys;
	}
	function geConsumtionHistory() public view returns (uint[] memory){
	    return consumtionHistory;
	}
	function getProductionHistory() public view returns (uint[] memory){
	    return productionHistory;
	}


	


}