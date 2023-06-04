import { ethers } from "ethers";

function convertBlockcTimeStampToStandardTime(blockTimestamp) {
    const date = new Date(blockTimestamp * 1000);
    return `${date.toLocaleDateString()}; ${date.toLocaleTimeString()}`;
}

export {convertBlockcTimeStampToStandardTime};