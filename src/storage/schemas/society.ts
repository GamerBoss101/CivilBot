import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true
};

const societySchema = new mongoose.Schema({
    _id: reqString,
    config: {  
        joinMessage: String,
    },
    leader: String,
    government: reqString,
    laws: Array<String>,
    jobs: Array<Object>,
    economy: {
        money: Number,
        tax: Number,
        max: Number
    }
});

export default class Society {
    model: any
    upsert: { upsert: boolean; };
    constructor() {
        this.model = mongoose.model('society', societySchema);
        this.upsert = { upsert: true };
    }
    
    async create(id: string): Promise<SocietyData> {
        const newSociety = new this.model({
            _id: id
        });
        await newSociety.save();
        return await this.get(id);
    }

    async get(id: string): Promise<SocietyData> {
        if(!id) return await this.model.find({});
        return await this.model.findOne({ _id: id });
    }

    async update(id: string, data: any): Promise<SocietyData> {
        let curent = await this.get(id);
        if(!curent) await this.create(id);
        await this.model.findByIdAndUpdate({  _id: id }, data, this.upsert);
        return await this.get(id);
    }

    async delete(id: string): Promise<boolean> {
        let result = await this.get(id);
        if(!result) return false;
        await this.model.deleteOne({ _id: id });
        return true;
    }

}