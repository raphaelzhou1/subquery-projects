import {subqlTest} from "@subql/testing";
import {StarterEntity} from "@subql/utils";

// https://academy.subquery.network/build/testing.html
subqlTest(
  "atlantic-2", // test name
    17997995, // block height to process
    [

    ], // dependent entities
    [
        StarterEntity.create({
            id: "28BAAADA4F65F70F2B95D0E1605564D589DC1F65EBED87F213BB2C2793668F66", // Replace this with the actual block hash for block 103
            blockHeight: 17997995,
            timestamp: "23M5ttkmR6KcoTAAE6gcmibnKFtVaTP5yxnY8HF1BmrJ2A1i",
            txHash: "28BAAADA4F65F70F2B95D0E1605564D589DC1F65EBED87F213BB2C2793668F66",
            contractAddress: "sei1dgs47p8fe384pepp4q09fqwxu0xpr99j69d7avhqkfs5vsyzvl2sajz57m",

        }),
    ],
  "handleEvent" //handler name
);
