import mongoose from "mongoose";

export async function connect() {
	try {
		await mongoose.connect(
			"mongodb+srv://Zich:pedrozich@cluster0.vzbh9zq.mongodb.net/hero-tickets"
		);

		console.log("Connect database success");
	} catch (error) {
		console.error(error);
	}
}
