import Citizen from "./schemas/citizen";
import Society from "./schemas/society";


export default class Mongo {
    society: Society;
    citizen: Citizen;
    constructor() {
        this.society = new Society();
        this.citizen = new Citizen();
    }
}