const { subqlTest } = require("@subql/testing");
const { SparrowswapSpotPrice } = require("../types/models/SparrowswapSpotPrice");


const sparrowswapSpotPrice = SparrowswapSpotPrice.get("17802601-sei1eg8c6g9sat4rpn92hkhfj83llgtlx5xjxnh9f9g9m9jlq4m63zks8sxrwe");

// https://academy.subquery.network/build/testing.html
subqlTest(
    "atlantic-2", // test name
    17997995, // block height to process
    [
        // SparrowswapSpotPrice.create( {
        //     id: "17802601-sei1eg8c6g9sat4rpn92hkhfj83llgtlx5xjxnh9f9g9m9jlq4m63zks8sxrwe",
        //     blockHeight: BigInt(17997995),
        //     timestamp: new Date("2023-06-27T18:24:29Z"),
        //     txHash: "F28C9DAF5AF59D6363ECBC71142A7F50B553930BDBF3DBD0021B76C491D21473",
        //     contractAddress: "sei1xmsxzq9up5y2gj6e3fxmuqu4hvr2v0yu7qt34qn6amqpcxmejeuqlumuvk",
        //     // offerAsset: "offerAssetString",
        //     // askAsset: "askAssetString",
        //     // offerAmount: 123456,
        //     // returnAmount: 123456,
        //     // spreadAmount: 1234,
        //     // commissionAmount: 12345,
        //     // rumPriceToSei: 123456,
        // } )
    ], // dependent entities
    [
        sparrowswapSpotPrice.create( {
            id: "17802601-sei1eg8c6g9sat4rpn92hkhfj83llgtlx5xjxnh9f9g9m9jlq4m63zks8sxrwe",
            blockHeight: BigInt(17997995),
            timestamp: new Date("2023-06-27T18:24:29Z"),
            txHash: "F28C9DAF5AF59D6363ECBC71142A7F50B553930BDBF3DBD0021B76C491D21473",
            contractAddress: "sei1xmsxzq9up5y2gj6e3fxmuqu4hvr2v0yu7qt34qn6amqpcxmejeuqlumuvk",
            // offerAsset: "offerAssetString",
            // askAsset: "askAssetString",
            // offerAmount: 123456,
            // returnAmount: 123456,
            // spreadAmount: 1234,
            // commissionAmount: 12345,
            // rumPriceToSei: 123456,
        } )

    ],
    "handleSparrowswapSpotPriceEvent"
);

