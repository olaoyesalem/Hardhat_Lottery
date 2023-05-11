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

app.get('/name',async (req,res)=>{
    try {
        const name = await GUST.name()
        res.send(name)
    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.get('/PERMIT_TYPEHASH',async (req,res)=>{
    try {
        const PERMIT_TYPEHASH = await GUST.PERMIT_TYPEHASH()
        res.send(PERMIT_TYPEHASH)
    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.get('/nonces',async (req,res)=>{ 
    try {
        const address = (req.params.address)
        const nonces = await GUST.nonces("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
        const nonce = ethers.utils.formatUnits(nonces)
        res.send((nonce))
    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.get('/DOMAIN_SEPARATOR',async (req,res)=>{
    try {
        const DOMAIN_SEPARATOR = await GUST.DOMAIN_SEPARATOR()
        res.send(DOMAIN_SEPARATOR)
    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.get('/decimals',async (req,res)=>{ //error
    try {
        const decimal= await GUST.decimals()
        res.send((ethers.utils.formatUnits(decimal)))
    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.get('/balanceOf', async (req,res)=>{
    try {
        const {address} = req.body;
        //const address = req.params.address
        const balanceOf = await GUST.balanceOf(address)
        res.send(ethers.utils.formatEther(balanceOf))
        


    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.get('/allowance/', async (req,res)=>{
    try {
        const {ownerAddress,spenderAddress}= req.body
        const allowance = await GUST.allowance(ownerAddress,spenderAddress)
        res.send(ethers.utils.formatEther(allowance))
        

    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

//transferOwnership


app.post('/transferOwnership/', async (req,res)=>{
    try {
        const {newOwner}= req.body
        const allowance = await GUST.transferOwnership(newOwner)
        await allowance.wait()
        res.json({success:true})
        

    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.post('/renounceOwnership/', async (req,res)=>{
    try {
        
        const allowance = await GUST.renounceOwnership()
        await allowance.wait()
        res.json({success:true})
        

    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.post('/transfer/', async (req,res)=>{
    try {
        const {address, amount} = req.body;
        // note that amount is in decimal i.e. if I transfer amount =1
        // i.e. i have transferred 1 Gust 
        const allowance = await GUST._transfer(address,amount)
        await allowance.wait()
        res.json({success:true})
        

    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.post('/approve/', async (req,res)=>{
    try {
        const {address, amount} = req.body;
    
        // more costly than permit 
        const allowance = await GUST.approve(address,amount)
        await allowance.wait()
        res.json({success:true})
        

    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.post('/increaseAllowance/', async (req,res)=>{
    try {
        const {address, amount} = req.body;
    
        
        const increaseAllowance = await GUST.increaseAllowance(address,amount)
        await increaseAllowance.wait()
        res.json({success:true})
        

    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.post('/decreaseAllowance/', async (req,res)=>{
    try {
        const {address, amount} = req.body;
    
        
        const decreaseAllowance = await GUST.decreaseAllowance(address,amount)
        await decreaseAllowance.wait()
        res.json({success:true})
        

    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})

app.post('/mint/', async (req,res)=>{
    try {
        const {address, amount} = req.body;
    
        
        const mint = await GUST.mint(address,amount)
        await mint.wait()
        res.json({success:true})
        

    } catch (error) {
        res.status(500).setMaxListeners(error.message)   
    }
})




// not gotten transferFrom

// permit after interacting(quicknode)

// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8








const port = 4000
app.listen(port,()=>{
    console.log("API Is starting frorm Port 4000")
   
})
