<!-- write about connecting to the local host

# Smart Contract REST API Documentation

This document provides an overview of the REST APIs available for interacting with the smart contract functions.

## Base URL

The base URL for all API endpoints is: `https://example.com/api`

## Authentication

Authentication is required to access the APIs. Include an API key or authentication token in the headers of each request.

## Endpoints

### 1. Execute Smart Contract Function

#### Endpoint

- `POST /smart-contract/:contract-address/:function-name`

#### Description

Executes the specified function of the smart contract with the given parameters.

#### Parameters

- `contract-address` (string, required): The address of the smart contract.
- `function-name` (string, required): The name of the function to be executed.

#### Request Body

The request body should contain the function parameters as an object.

```json
{
  "param1": "value1",
  "param2": "value2"
}

Response
Status: 200 OK
Body: The response object containing the result of the smart contract function execution.

{
  "result": "function execution result"
}


2. Get Smart Contract State
Endpoint
GET /smart-contract/:contract-address/state
Description
Retrieves the current state of the smart contract.

Parameters
contract-address (string, required): The address of the smart contract.
Response
Status: 200 OK
Body: The response object containing the current state of the smart contract.

{
  "state": "current state of the smart contract"
}
Error Handling
In case of errors, the API will return appropriate HTTP status codes along with error messages in the response body.

Example Error Response
{
  "error": "Error message"
}
 -->


// ANother One

Sure! Here's an example of how you can document the API for a smart contract:

# Smart Contract API Documentation

## Introduction
This documentation provides an overview of the API for the Smart Contract, which allows users to interact with the contract's functions and access its data. The Smart Contract is deployed on the hardahat Local blockchain and uses 
port 4000 in the local host.

To spit out the Hardhat Local Blockchain, USE
```
yarn hardhat node
```

To start running port 4000, USE

```
node API/api.js
```

## Base URL
The base URL for all API endpoints is: `http://localhost:4000/smart-contract/info`


### Request
This retrieves  Basic information about the GUST Contract.
```
`GET /smart-contract/info`
```

#### Response
- `contractAddress` (string): The address of the deployed Smart Contract.
- `contractName` (string): The name of the Smart Contract.
- `contractVersion` (string): The version of the Smart Contract.
- `author` (string): The author of the Smart Contract.
- `totalSupply` (uint256): The total supply of the contract's token.
- `tokenSymbol` (string): The symbol of the contract's token.




 * ### TOTAL SUPPLY
This gives the total amount of GUST tokens that has been minted.
## Endpoints
```
http://localhost:4000/totalSupply/

```
### Request
This retrieves  Basic information about the GUST Contract.

```
`GET /totalSupply/`
```

#### Response
```
1000.0
```

### *SYMBOL
This gives the Symbol of GUST token.
## Endpoints
```
http://localhost:4000/symbol/

```
### Request

This gives the total amount of GUST tokens that has been minted.
```
`GET /symbol/`
```

#### Response
```
GU$T
```

* ###  OWNER

## Endpoints
```
http://localhost:4000/owner/

```
### Request
This gives the Owner i.e the one who deployed/ holds all of GUST tokens that has been minted.

```
`GET /owner/`
```

#### Response
```
0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

* ### NAME

## Endpoints
```
http://localhost:4000/name/

```
* ### Request
This gives the Name  GUST tokens that has been minted.

```
`GET /owner/`
```

#### Response
```
GUST
```

* ### PERMIT_TYPEHASH

## Endpoints
```
http://localhost:4000/PERMIT_TYPEHASH/

```
* ### Request
This gives the PERMIT_TYPEHASH of  GUST token.

```
`GET /PERMIT_TYPEHASH/`
```

#### Response
```
0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9
```


* ### NONCES

## Endpoints
```
http://localhost:4000/nonces/

```
* ### Request
This gives the nonce of  any address , so has to avoid replay of txn.

```
`GET /nonces/`
```

#### Response
Generally, starts from zero and increases by 1 with each number of txns.

* ### DOMAIN_SEPARATOR

## Endpoints
```
http://localhost:4000/DOMAIN_SEPARATOR/

```
* ### Request
This returns the hash the DOMAIN_SEPARATOR of  GUST token.

```
`GET /DOMAIN_SEPARATOR/`
```

#### Response
```
It returns the hash of the domain separator e.g. 0x515b276498fe8273a64e11bb00b92510cd939f4bc438cda7f5d1f1b8da8fbe02
```

* ### DECIMALS

## Endpoints
```
http://localhost:4000/decimals/

```
* ### Request
Returns the number of decimals used to get its user representation. For example, The decimals used 
in the contract equals 18, a balance of 1000000000000000000 tokens should be displayed to a user as 1 (1000000000000000000 / 10 ** 18).
This is to imitate the relationship between ethers and wei.

```
`GET /decimals/`
```

#### Response

```
18
```

* ### BALANCE OF

## Endpoints
```
http://localhost:4000/balanceOf/

```
* ### Request
This returns the balance of GUST tokens an address have
* ### Params

```json
{
  "address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",

}
```

```
`GET /balanceOf/`
```

#### Response

```
1000
```

* ### ALLOWANCE

## Endpoints
```
http://localhost:4000/allowance/

```
* ### Request
This returns the balance of GUST tokens an address have
* ### Params

```json
{
  "ownerAddress": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "spenderAddress":"0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

}
```

```
`POST /allowance/`
```

#### Response
This request allows user to spend an amount of GUST token on thier behalf

``` json
{success:true}

```
#### Requirements
spendrAddress cannot be the zero address.

the ownerAddress must have a balance of at least amount.



* ### TRANSFER OWNERSHIP

## Endpoints
```
http://localhost:4000/transferOwnership/

```
* ### Request
This allow a user (ownerAddress) to transfer ownerShip to another user.
The new user then becomes the onwer of the GUST token.
* ### Params

```json
{
  "newOwner":"0x70997970C51812dc3A010C7d01b50e0d17dc79C8"

}
```

```
`POST /transferOwnership/`
```

#### Response
This request allows user to spend an amount of GUST token on thier behalf
``` json
{success:true}

```

#### Requirements
newOwner cannot be the zero address.





* ### RENOUNCE OWNERSHIP

## Endpoints
```
http://localhost:4000/renounceOwnership/

```
* ### Request
This allow a user (ownerAddress) to transfer ownerShip to another user.
The new user then becomes the onwer of the GUST token.
* ### Params

None

```
`POST /renounceOwnership/`
```

#### Response
This request allows user to spend an amount of GUST token on thier behalf
``` json
{success:true}

```
#### Requirements
newOwner cannot be the zero address.





* ### TRANSFER 

## Endpoints
```
http://localhost:4000/transfer/

```
* ### Request
This allow a user (ownerAddress) to transfer amount of token to another user.
* ### Params

```json
{
  address:"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  amount:1
}
```

```
`POST /transfer/`
```

#### Response
``` json
{success:true}

```

#### Requirements
address cannot be the zero address.
amount must be in wwhole number
the caller must have a balance of at least amount




* ### APPROVE 

## Endpoints
```
http://localhost:4000/approve/

```
* ### Request
This allow a user (ownerAddress) another user spend GUST tokens on thier behalf.
* ### Params

```json
{
  address:"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  amount:1
}
```

```
`POST /approve/`
```

#### Response

``` json
{success:true}

```
#### Requirements
spender cannot be the zero address.
amount must be in whole number




* ### INCREASE ALLOWANCE 

## Endpoints
```
http://localhost:4000/increaseAllowance/

```
* ### Request
Atomically increases the allowance granted to spender by the caller..
* ### Params

```json
{
  address:"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  amount:1
}
```

```
`POST /increaseAllowance/`
```

#### Response


``` json
{success:true}

```
#### Requirements
spender cannot be the zero address.
amount must be in whole number


* ### DECREASE ALLOWANCE 

## Endpoints
```
http://localhost:4000/decreaseAllowance/

```
* ### Request
Atomically decreases the allowance granted to spender by the caller..
* ### Params

```json
{
  address:"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  amount:1
}
```

```
`POST /decreaseAllowance/`
```

#### Response


``` json
{success:true}

```
#### Requirements
spender cannot be the zero address.
amount must be in whole number


* ### MINT

## Endpoints
```
http://localhost:4000/mint/

```
* ### Request
Mints GUST tokens. Can only be called by the ownerr of the contract.
* ### Params

```json
{
  address:"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  amount:1
}
```

```
`POST /mint/`
```

#### Response


``` json
{success:true}

```
#### Requirements
Caller must be the owner of the contract








