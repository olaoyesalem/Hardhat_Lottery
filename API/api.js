const {ethers} = require("hardhat")
require("dotenv").config()
const contractAddress = process.env.CONTRACT_ADDRESS
const LOCAL_HOST_URL = process.env.LOCAL_HOST_URL 
const LOCAL_HOST_PRIVATE_KEY = process.env.LOCAL_HOST_PRIVATE_KEY

const provider = new ethers.providers.JsonRpcProvider(LOCAL_HOST_URL)
const signer = new ethers.Wallet(LOCAL_HOST_PRIVATE_KEY,provider)
const {abi} = require("../artifacts/contracts/GUST.sol/GUST.json")

const GUST =  new ethers.Contract(contractAddress,abi,signer);

const express = require("express")
const app = express()
app.use(express.json())



app.get('/totalSupply/',async (req,res)=>{
    // totalSupply: This gives the total number of GUST token that has been minted 
    try {
        const totalSupply = await GUST.totalSupply();
        
        res.send(ethers.utils.formatEther(totalSupply))
    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.get('/symbol',async (req,res)=>{
    try {
        const symbol = await GUST.symbol();
        res.send(symbol)
    } catch (error) {
        res.status(500).setMaxListeners(error.message)
        
    }
})

app.get('/owner',async (req,res)=>{
    try {
        const owner = await GUST.owner()
        res.send(owner)
    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})




const port = 4000
app.listen(port,()=>{
    console.log("API Is starting frorm Port 4000")
   
})
