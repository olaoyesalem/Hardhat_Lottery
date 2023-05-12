// This scripts interacts with the GUST token smart contract

//Call the Permit function
//And now the moment you've been waiting for. 
//In this section, I'll show  how to allow users to approve token spend without spending gas

const {ethers,network} = require("hardhat")
require("dotenv").config()
const LOCAL_HOST_URL = process.env.LOCAL_HOST_URL
const LOCAL_HOST_PRIVATE_KEY = process.env.LOCAL_HOST_PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const ACCOUNT_2 = process.env.ACCOUNT_2

const provider = new ethers.providers.JsonRpcProvider(LOCAL_HOST_URL)
const tokenOwner =  new ethers.Wallet(LOCAL_HOST_PRIVATE_KEY,provider)
const {abi} = require("../../artifacts/contracts/GUST.sol/GUST.json")

const GUST = new ethers.Contract(CONTRACT_ADDRESS,abi,tokenOwner)
const value = ethers.utils.parseEther("1")
const deadline = getTimeInSeconds()+4200;

let domain,types


function getTimeInSeconds(){
return Math.floor(Date.now()/1000)
}


async function main(){
    //
const tokenReciever =  new ethers.Wallet(ACCOUNT_2,provider)

// check accountBalance

let tokenOwnerBalance = (await GUST.balanceOf(tokenOwner.address)).toString()


let tokenRecieverBalance = (await GUST.balanceOf(tokenReciever.address)).toString()


const nonces = await GUST.nonces(tokenOwner.address)
const  chainId = await network.config.chainId



 domain ={
    name: await GUST.name(),
    version:"1",
    chainId:chainId,
    verifyingContract:GUST.address
}

 types = {
    Permit: [{
        name: "owner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      },
      {
        name: "value",
        type: "uint256"
      },
      {
        name: "nonce",
        type: "uint256"
      },
      {
        name: "deadline",
        type: "uint256"
      },
       ],
  };


     // set the Permit type values
     const values = {
        owner: tokenOwner.address,
        spender:tokenReciever.address,
        value: value,
        nonce: nonces,
        deadline: deadline,
      };


      // // sign the Permit type data with the deployer's private key
      const signature = await tokenOwner._signTypedData(domain,types,values)
      // split the signature into its components
      const sig = await ethers.utils.splitSignature(signature)

       // verify the Permit type data with the signature
       const recovered = ethers.utils.verifyTypedData(
        domain,
        types,
        values,
        sig
      );
        
      
          // get network gas price
    gasPrice = await provider.getGasPrice()

        // permit thetokenReciever address to spend tokens on behalf of the tokenOwner
    let tx = await GUST.connect(tokenOwner).permit(
        tokenOwner.address,
       tokenReciever.address,
        value,
        deadline,
        sig.v,
        sig.r,
        sig.s, {
          gasPrice: gasPrice,
          gasLimit: 80000 
        }
      );

    
      //await tx.wait(2)

       // check that thetokenReciever address can now spend tokens on behalf of the tokenOwner
    
  

}





main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });


  module.exports={
    domain,
    types
  }