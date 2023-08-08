import { Price } from "./Price";
import { User } from "./User";
import { Location } from "./Location";

class Event {
	constructor(
		public title: string,
		public location: Location,
		public date: Date,
		public description: string,
		public banner: string,
		public cupons: string[],
		public participants: User[],
		public price: Price[]
	) {}
}

export { Event };
