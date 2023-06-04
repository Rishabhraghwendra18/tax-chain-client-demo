import { ethers } from "ethers";

function convertBlockcTimeStampToStandardTime(blockTimestamp) {
    return new Date(blockTimestamp * 1000).toLocaleDateString();
}

export {convertBlockcTimeStampToStandardTime};