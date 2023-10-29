
export global {

    type CitizenData = {
        _id: string,
        bio: string,
        age: number,
        gender: string,
        job: string,
        religion: string,
        family: Array<string>,
        education: number,
        partner: string,
        bank: {
            wallet: number
        },
        inventory: Array<string>,
        health: number
    }

    type SocietyData = {
        _id: string,
        government: string,
        laws: Array<string>,
        jobs: Array<Object>,
        economy: {
            money: number,
            tax: number
        }
    };
    
}