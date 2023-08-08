import express, { Application } from "express";
import { connect } from "./infra/database";

class App {
	public app: Application;
	constructor() {
		this.app = express();
		this.middlewaresInitialize();
		this.initializeRoutes();
		this.interceptionError();
		connect();
	}

	initializeRoutes() {
		// this.app.use("./", )
	}

	middlewaresInitialize() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	interceptionError() {
		// this.app.use()
	}

	listen() {
		this.app.listen(3333, () => {
			console.log("server is running...");
		});
	}
}

export { App };
