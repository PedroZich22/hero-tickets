import mongoose from "mongoose";
import { UserRepository } from "./UserRepository";
import { User } from "../entities/User";

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: new mongoose.Types.ObjectId().toString(),
	},
	name: String,
	email: String,
});

const UserModel = mongoose.model("User", userSchema);

class UserRepositoryMongoose implements UserRepository {
	async add(user: User): Promise<User> {
		const userModel = new UserModel(user);
		await userModel.save();

		console.log("", user);
		return user;
	}

	async verifyIfUserExists(email: string): Promise<User | undefined> {
		const result = await UserModel.findOne({ email }).exec();

		return result ? result.toObject() : undefined;
	}
}

export { UserRepositoryMongoose };
