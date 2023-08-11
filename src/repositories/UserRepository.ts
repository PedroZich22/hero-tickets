import { User } from "../entities/User";

interface UserRepository {
	add(user: User): Promise<User>;
	verifyIfUserExists(email: string): Promise<any>;
}

export { UserRepository };
