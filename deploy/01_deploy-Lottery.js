const { ethers,network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const{verify} = require("../utils/verify.js")



module.exports = async function ({getNamedAccounts, deployments}) {
  const VRF_FUND_AMOUNT = await ethers.utils.parseEther("1")
  const {deploy,log} = deployments
  const {deployer}= await getNamedAccounts()
  let vrfCoordinatorV2Address,subscription_id,callBackGasLimit,interval,entranceFee,gasLane,txnReceipt
  const chainId = network.config.chainId

  if(developmentChains.includes(network.name)){
    const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
     entranceFee = networkConfig[chainId]["entranceFee"]
     console.log(`1`)
     gasLane = networkConfig[chainId]["gasLane"]
     console.log(`2`)
    const txnResponse = await vrfCoordinatorV2Mock.createSubscription()
    console.log(`3`)
     txnReceipt = await txnResponse.wait(1)
     console.log(`4`)
    subscription_id = txnReceipt.events[0].args.subId
    console.log(subscription_id)
    console.log(`5`)
    await vrfCoordinatorV2Mock.fundSubscription(subscription_id,VRF_FUND_AMOUNT)
    console.log(`6`)
    
    callBackGasLimit = networkConfig[chainId]["callBackGasLimit"]
    console.log(`7`)
    interval= networkConfig[chainId]["interval"] 
  }else{
    vrfCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"]
    subscription_id = networkConfig[chainId["subscriptionId"]]
    callBackGasLimit = networkConfig[chainId]["callBackGasLimit"]
    interval= networkConfig[chainId]["interval"]
  }
 const args =[vrfCoordinatorV2Address,entranceFee,gasLane,subscription_id,callBackGasLimit,interval]
  
  const lottery = await deploy("lottery",{
    from:deployer,
    args:args,
    log:true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })

  if(!developmentChains.includes(network.name) && ETHERSCAN_API_KEY){
    log("verifying..")
    await verify(lottery.address, args)

  }
  log("-----------------------------")
}
