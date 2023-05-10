const {ethers} = require("hardhat")
require("dotenv").config()
const contractAddress = process.env.CONTRACT_ADDRESS
const LOCAL_HOST_URL = process.env.LOCAL_HOST_URL 
const LOCAL_HOST_PRIVATE_KEY = process.env.LOCAL_HOST_PRIVATE_KEY

const provider = new ethers.providers.JsonRpcProvider(LOCAL_HOST_URL)
const signer = new ethers.Wallet(LOCAL_HOST_PRIVATE_KEY,provider)
const {abi} = require("../artifacts/contracts/GUST.sol/GUST.json")

const GUST =  new ethers.Contract(contractAddress,abi,signer);

// wanna check fot the total supply

async function main(){
    const totalSupply = await GUST.totalSupply()
    console.log(ethers.utils.formatEther(totalSupply))
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
