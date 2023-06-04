import { gql,cacheExchange, createClient, dedupExchange, fetchExchange } from "urql";

const client = createClient({
    url: 'https://api.studio.thegraph.com/query/47824/weth-sepolia/version/latest',
    exchanges: [dedupExchange, cacheExchange, fetchExchange]
  });

async function WETHQuery(dstAddress,srcAddress) {
    const query = gql`
    {
      transfers(
        where: {dst: "${dstAddress}", src: "${srcAddress}"}
      ) {
        transactionHash
        wad
        blockTimestamp
      }
    }`
    return await client.query(query).toPromise();
}
export default WETHQuery;