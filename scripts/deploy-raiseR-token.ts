import * as fs from 'fs-extra';
import { ethers, upgrades } from "hardhat";
import { CHAIN_ID, PATH } from './const';
import * as dotenv from 'dotenv';
import { FeeData } from "@ethersproject/abstract-provider";

async function start() {
  let chainId = CHAIN_ID;
  let path = PATH;
  dotenv.config({ path });
  
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  let accountBalance = await deployer.getBalance();
  console.log("Balance before deploying token contract:", accountBalance.toString());
  //--------------------------------------
  // Eth mainnet 
  const FEE_DATA = {
    maxFeePerGas:         ethers.utils.parseUnits('50', 'gwei'),
    maxPriorityFeePerGas: ethers.utils.parseUnits('25', 'gwei'),
  };
  
  // Wrap the provider so we can override fee data.
  const provider = new ethers.providers.FallbackProvider([ethers.provider], 1);
  provider.getFeeData = async () => FEE_DATA as FeeData;
  
  // Create the signer for the private key, connected to the provider with hardcoded fee data
  const signer = (new ethers.Wallet(process.env.KEY)).connect(provider); // NOTE: signer and deloyer must be the same account 
  // --------------------------------------
  let cap = "1000000000000000000000000000";
  console.log("Cap = ", cap);

  const sharedAddressPath = `${process.cwd()}/deployed-raiser-info/${chainId}.json`;  
  // @ts-ignore
  const addressBook = JSON.parse(await fs.readFileSync(sharedAddressPath));  
  addressBook.deployer = deployer.address;
  
  console.log('Deploying RaiseR Token...');
  const Token = await ethers.getContractFactory("RAISER", signer);
  
  const token = await upgrades.deployProxy(Token, ["RaiseR Token","RZR", cap], {
    initializer: "initialize",  
  });
  console.log('Deploy tx:', token.deployTransaction.hash);

  await token.deployed();
  console.log("Token deployed to proxy address:", token.address);
  console.log("Token implementation code address:", await upgrades.erc1967.getImplementationAddress(token.address));

  addressBook.token = token.address;   
  
  await fs.writeFile(sharedAddressPath, JSON.stringify(addressBook, null, 2));
  console.log(`Contracts deployed and configured. ☼☽`);

  accountBalance = await deployer.getBalance();
  console.log("Balance after deploying token contract:", accountBalance.toString());
}

start().catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
