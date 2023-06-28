// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames} from "@subql/types";
import assert from 'assert';




export type SparrowswapSpotPriceProps = Omit<SparrowswapSpotPrice, NonNullable<FunctionPropertyNames<SparrowswapSpotPrice>>| '_name'>;

export class SparrowswapSpotPrice implements Entity {

    constructor(
        
            id: string,
        
            blockHeight: bigint,
        
            timestamp: Date,
        
            txHash: string,
        
            contractAddress: string,
        
        
        
        
        
        
        
        
    ) {
        
            this.id = id;
        
            this.blockHeight = blockHeight;
        
            this.timestamp = timestamp;
        
            this.txHash = txHash;
        
            this.contractAddress = contractAddress;
        
    }


    public id: string;

    public blockHeight: bigint;

    public timestamp: Date;

    public txHash: string;

    public contractAddress: string;

    public offerAsset?: string;

    public askAsset?: string;

    public offerAmount?: number;

    public returnAmount?: number;

    public spreadAmount?: number;

    public commissionAmount?: number;

    public rumPriceToSei?: number;


    get _name(): string {
        return 'SparrowswapSpotPrice';
    }

    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save SparrowswapSpotPrice entity without an ID");
        await store.set('SparrowswapSpotPrice', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove SparrowswapSpotPrice entity without an ID");
        await store.remove('SparrowswapSpotPrice', id.toString());
    }

    static async get(id:string): Promise<SparrowswapSpotPrice | undefined>{
        assert((id !== null && id !== undefined), "Cannot get SparrowswapSpotPrice entity without an ID");
        const record = await store.get('SparrowswapSpotPrice', id.toString());
        if (record){
            return this.create(record as SparrowswapSpotPriceProps);
        }else{
            return;
        }
    }



    static create(record: SparrowswapSpotPriceProps): SparrowswapSpotPrice {
        assert(typeof record.id === 'string', "id must be provided");
        let entity = new this(
        
            record.id,
        
            record.blockHeight,
        
            record.timestamp,
        
            record.txHash,
        
            record.contractAddress,
        );
        Object.assign(entity,record);
        return entity;
    }
}
