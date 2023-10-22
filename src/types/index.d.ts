
export global {

    type CitizenData = {
        _id: string,
        rank: string,
        job: string,
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
    }
    
}