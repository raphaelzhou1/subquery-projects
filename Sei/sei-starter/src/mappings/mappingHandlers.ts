import { CosmosEvent } from "@subql/types-cosmos";
import { ExchangeRate, DailyAggregation, SparrowswapSpotPrice } from "../types";

async function updateDailyAggregation(
  date: Date,
  priceUSD: number
): Promise<void> {
  const id = date.toISOString().slice(0, 10);
  let aggregation = await DailyAggregation.get(id);
  if (!aggregation) {
    aggregation = DailyAggregation.create({
      id,
      openPriceUSD: priceUSD,
      highPriceUSD: priceUSD,
      lowPriceUSD: priceUSD,
      closePriceUSD: priceUSD,
    });
  }

  if (priceUSD > aggregation.highPriceUSD) aggregation.highPriceUSD = priceUSD;
  if (priceUSD < aggregation.lowPriceUSD) aggregation.lowPriceUSD = priceUSD;
  aggregation.closePriceUSD = priceUSD;

  await aggregation.save();
}

export async function handleFundingRateChangeEvent(
  event: CosmosEvent
): Promise<void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(
    `New funding rate change at block ${event.block.block.header.height}`
  );

  const contractAddress: string | undefined = event.event.attributes.find(
    (a) => a.key === "_contract_address"
  )?.value;

  if (contractAddress) {
    const id = `${event.block.header.height}-${contractAddress}`;

    let exchangeRate = await ExchangeRate.get(id);
    if (!exchangeRate) {
      exchangeRate = ExchangeRate.create({
        id,
        blockHeight: BigInt(event.block.header.height),
        timestamp: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        contractAddress,
      });
    }

    // Cosmos events code attributes as an array of key value pairs, we're looking for to extract a few things
    // Example https://sei.explorers.guru/transaction/9A5D1FB99CDFB03282459355E4C7221D93D9971160AE79E201FA2B2895952878
    for (const attr of event.event.attributes) {
      if (attr.key === "time") {
        // encoded as seconds
        exchangeRate.timestamp = new Date(parseFloat(attr.value) * 1000);
      } else if (attr.key === "long-rate") {
        exchangeRate.longRate = parseFloat(attr.value);
      } else if (attr.key === "short-rate") {
        exchangeRate.shortRate = parseFloat(attr.value);
      } else if (attr.key === "contract_version") {
        exchangeRate.contractVersion = attr.value;
      } else if (attr.key === "contract_name") {
        exchangeRate.contractName = attr.value;
      }
    }
    await exchangeRate.save();

    if (exchangeRate.priceUSD) {
      await updateDailyAggregation(
        exchangeRate.timestamp,
        exchangeRate.priceUSD
      );
    }
  }
}

export async function handleSpotPriceEvent(event: CosmosEvent): Promise<void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(
    `New spot price change at block ${event.block.block.header.height} at time ${event.block.block.header.time}`
  );
  const contractAddress: string | undefined = event.event.attributes.find(
    (a) => a.key === "_contract_address"
  )?.value;

  if (contractAddress) {
    const id = `${event.block.header.height}-${contractAddress}`;

    let exchangeRate = await ExchangeRate.get(id);
    if (!exchangeRate) {
      exchangeRate = ExchangeRate.create({
        id,
        blockHeight: BigInt(event.block.header.height),
        timestamp: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        contractAddress,
      });
    }

    // Cosmos events code attributes as an array of key value pairs, we're looking for to extract a few things
    // Example https://sei.explorers.guru/transaction/9A5D1FB99CDFB03282459355E4C7221D93D9971160AE79E201FA2B2895952878
    for (const attr of event.event.attributes) {
      if (attr.key === "time") {
        // encoded as seconds
        exchangeRate.timestamp = new Date(parseFloat(attr.value) * 1000);
      } else if (attr.key === "price-notional") {
        exchangeRate.priceNotional = parseFloat(attr.value);
      } else if (attr.key === "price-base") {
        exchangeRate.priceUSD = parseFloat(attr.value);
      } else if (attr.key === "contract_version") {
        exchangeRate.contractVersion = attr.value;
      } else if (attr.key === "contract_name") {
        exchangeRate.contractName = attr.value;
      }
    }
    await exchangeRate.save();

    if (exchangeRate.priceUSD) {
      await updateDailyAggregation(
        exchangeRate.timestamp,
        exchangeRate.priceUSD
      );
    }
  }
}


export async function handleSparrowswapSpotPriceEvent(event: CosmosEvent): Promise<void> {
  // We create a new entity using the transaction hash and message index as a unique ID
  logger.info(
      `New Sparrowswap spot price change at block ${event.block.block.header.height}`
  );
  const contractAddress: string | undefined = event.event.attributes.find(
      (a) => a.key === "_contract_address"
  )?.value;


  if (contractAddress) {
    const id = `${event.block.header.height}-${contractAddress}`;

    let sparrowswapSpotPrice = await SparrowswapSpotPrice.get(id);
    if (!sparrowswapSpotPrice) {
      sparrowswapSpotPrice = SparrowswapSpotPrice.create({
        id,
        blockHeight: BigInt(event.block.header.height),
        timestamp: new Date(event.block.header.time.toISOString()),
        txHash: event.tx.hash,
        contractAddress,
      });
    }



    // Cosmos events code attributes as an array of key value pairs, we're looking for to extract a few things
    // Example https://sei.explorers.guru/transaction/9A5D1FB99CDFB03282459355E4C7221D93D9971160AE79E201FA2B2895952878
    for (const attr of event.event.attributes) {
      if (attr.key === "time") {
        // encoded as seconds
        sparrowswapSpotPrice.timestamp = new Date(parseFloat(attr.value) * 1000);
      }
      else if (attr.key === "offer_asset") {
        sparrowswapSpotPrice.offerAsset = attr.value;
      }
      else if (attr.key === "ask_asset") {
        sparrowswapSpotPrice.askAsset = attr.value;
      }
      else if (attr.key === "offer_amount") {
        sparrowswapSpotPrice.offerAmount = parseFloat(attr.value);
      }
      else if (attr.key === "return_amount") {
        sparrowswapSpotPrice.returnAmount = parseFloat(attr.value);
      }
      else if (attr.key === "spread_amount") {
        sparrowswapSpotPrice.spreadAmount = parseFloat(attr.value);
      }
      else if (attr.key === "commission_amount") {
        sparrowswapSpotPrice.commissionAmount = parseFloat(attr.value);
      }
    }

    if (sparrowswapSpotPrice.offerAsset && sparrowswapSpotPrice.askAsset && sparrowswapSpotPrice.offerAmount && sparrowswapSpotPrice.returnAmount && sparrowswapSpotPrice.commissionAmount) {

      if (sparrowswapSpotPrice.offerAsset == "sei1xmsxzq9up5y2gj6e3fxmuqu4hvr2v0yu7qt34qn6amqpcxmejeuqlumuvk" && sparrowswapSpotPrice.askAsset == "usei") {
        const { assetPair, offer_price_to_ask_asset } = calculatePrice(sparrowswapSpotPrice.offerAsset, sparrowswapSpotPrice.askAsset, sparrowswapSpotPrice.offerAmount, sparrowswapSpotPrice.returnAmount, sparrowswapSpotPrice.commissionAmount);
        sparrowswapSpotPrice.rumPriceToSei = offer_price_to_ask_asset;
        logger.info(`Sparrowswap spot price for ${assetPair} is ${offer_price_to_ask_asset}`);

      } else if (sparrowswapSpotPrice.askAsset == "sei1xmsxzq9up5y2gj6e3fxmuqu4hvr2v0yu7qt34qn6amqpcxmejeuqlumuvk" && sparrowswapSpotPrice.offerAsset == "usei") {
        const { assetPair, offer_price_to_ask_asset } = calculatePrice(sparrowswapSpotPrice.askAsset, sparrowswapSpotPrice.offerAsset, sparrowswapSpotPrice.returnAmount, sparrowswapSpotPrice.offerAmount, sparrowswapSpotPrice.commissionAmount);
        sparrowswapSpotPrice.rumPriceToSei = offer_price_to_ask_asset;
        logger.info(`Sparrowswap spot price for ${assetPair} is ${offer_price_to_ask_asset}`);
      }
    }


    await sparrowswapSpotPrice.save();
  }
}

function calculatePrice(offerAsset: string, askAsset: string, offerAmount: number, returnAmount: number, commissionAmount: number) {
  offerAmount = Math.max(offerAmount - commissionAmount, 0);
  const assetPair = `${offerAsset}-${askAsset}`;
  let offer_price_to_ask_asset = 0;
  if (offerAmount != 0) {
    offer_price_to_ask_asset = returnAmount / offerAmount;
  }
  return { assetPair, offer_price_to_ask_asset };
}
