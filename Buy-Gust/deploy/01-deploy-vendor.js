const { network,ethers } = require('hardhat')
const { verify } = require('../utils/verify')
const { developmentChains,tokenContractAddress} = require('../helper-hardhat-config')
require("dotenv").config();

module.exports = async({getNamedAccounts,deployments})=>{
    const {log,deploy} = deployments
    const {deployer} = await getNamedAccounts()
    

    if (developmentChains.includes(network.name)) {
        const Vendor = await deploy('Vendor', {
            
           

            from: deployer,
            log: true,
            args: [tokenContractAddress],
            
        })
        console.log(` Deploying !!!!`)
        console.log(`-------------------------`)
        console.log(`Deployed at :${Vendor.address}`)
        
        
       } 
       if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(Vendor.address, args)
    }
       

       
    log(`Deployer : ${deployer}`)

    
    log('--------------------------')

}