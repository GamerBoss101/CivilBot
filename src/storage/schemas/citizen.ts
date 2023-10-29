import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true
};

const citizenSchema = new mongoose.Schema({
    _id: reqString,
    bio: String,
    age: {
        type: Number,
        default: 13
    },
    gender: String,
    job: {
        type: String,
        default: "Unemployed"
    },
    religion: String,
    family: {
        type: Array,
        default: []
    },
    education: {
        type: Number,
        default: 0
    }, 
    partner: String,
    bank: {
        wallet: {
            type: Number,
            default: 500
        }
    },
    inventory: {
        type: Array,
        default: []
    },
    health: {
        type: Number,
        default: 100
    }
});

export default class Citizen {
    model: any
    upsert: { upsert: boolean; };
    constructor() {
        this.model = mongoose.model('citizen', citizenSchema);
        this.upsert = { upsert: true };
    }
    
    async create(id: string): Promise<CitizenData> {
        const newCitizen = new this.model({
            _id: id
        });
        await newCitizen.save();
        return await this.get(id);
    }

    async get(id: string): Promise<CitizenData> {
        if(!id) return await this.model.find({});
        let data = await this.model.findOne({ _id: id });
        if (!data) return await this.create(id);
        return data;
    }

    async update(id: string, data: any): Promise<CitizenData | any> {
        let curent = await this.get(id);
        if(!curent) await this.create(id);
        await this.model.findByIdAndUpdate({  _id: id }, data, this.upsert);
        return await this.get(id);
    }

    async delete(id: string): Promise<boolean> {
        let result = await this.get(id);
        if(!result) return false;
        await this.model.deleteOne({ _id: id })
        return true;
    }
}