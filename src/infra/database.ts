import mongoose from "mongoose";

export async function connect() {
	try {
		await mongoose.connect(
			"mongodb+srv://Zich:pedrozich@cluster0.vzbh9zq.mongodb.net/hero-tickets"
		);
	} catch (error) {
		console.log("🚀 ~ file: database.ts:5 ~ connect ~ error:", error);
	}
}
