export const CHAIN_ID_ETH = 1;
export const CHAIN_ID_ETH_SEPOLIA = 11155111;
export const CHAIN_ID_ETH_GOERLI = 5;
export const CHAIN_ID_RINKEBY = 4;
export const CHAIN_ID_BSC = 56;
export const CHAIN_ID_BSC_TEST = 97;
export const CHAIN_ID_ARB = 42161;
export const CHAIN_ID_ARB_GOERLI = 421613;
export const CHAIN_ID_POLYGON = 137;
export const CHAIN_ID_POLYGON_MUMBAI = 80001;

export const CHAIN_ID = CHAIN_ID_ETH;
let chainId = CHAIN_ID;

export const PATH = `${process.cwd()}/.env${
    chainId === CHAIN_ID_ETH ? '.eth' :
    chainId === CHAIN_ID_ETH_SEPOLIA ? '.ethsepolia' :
    chainId === CHAIN_ID_ETH_GOERLI ? '.ethgoerli' :
    chainId === CHAIN_ID_RINKEBY ? '.rinkeby' :
    chainId === CHAIN_ID_BSC ? '.bsc' :
    chainId === CHAIN_ID_ARB ? '.arb' :
    chainId === CHAIN_ID_ARB_GOERLI ? '.arbgoerli' :
    chainId === CHAIN_ID_POLYGON_MUMBAI ? '.mumbai' :
    chainId === CHAIN_ID_POLYGON ? '.polygon' :
    chainId === CHAIN_ID_BSC_TEST ? '.bsctest' : '.dev'
}`;