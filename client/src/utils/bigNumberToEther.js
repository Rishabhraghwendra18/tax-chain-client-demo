import { ethers } from "ethers";

function bigNumberToEthers(value) {
    return ethers.utils.formatUnits(ethers.BigNumber.from(value),18);
}

export {bigNumberToEthers};