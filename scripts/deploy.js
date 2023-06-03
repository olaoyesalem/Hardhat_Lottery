// I want to get the subscription Id as an even from the MockContract


const { ethers } = require("hardhat");
const { BASE_FEE, GAS_PRICE_LINK } = require("../helper-hardhat-config");


 async function main (){
const contractFactory = await ethers.getContractFactory("VRFCoordinatorV2Mock")
const contract = await contractFactory.deploy(BASE_FEE,GAS_PRICE_LINK)
 await contract.deployed
 const contractAddress = contract.address
console.log(contractAddress) 
  
const subscription_id = contract.events[0]
console.log(subscription_id)

}

 main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
