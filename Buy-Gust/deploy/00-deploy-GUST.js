const { network,ethers } = require('hardhat')
const { verify } = require('../utils/verify')
const { developmentChains,TokenAmount} = require('../helper-hardhat-config')
require("dotenv").config();

module.exports = async({getNamedAccounts,deployments})=>{
    const {log,deploy} = deployments
    const {deployer} = await getNamedAccounts()
    

    if (developmentChains.includes(network.name)) {
        const GUST = await deploy('GUST', {
            
           

            from: deployer,
            log: true,
            args: [TokenAmount],
            
        })
        console.log(` Deploying !!!!`)
        console.log(`-------------------------`)
        console.log(`Deployed at :${GUST.address}`)
        
        
       } 
       if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(GUST.address, args)
    }
       

       
    log(`Deployer : ${deployer}`)

    
    log('--------------------------')

}