import express, { Application } from "express";
import { connect } from "./infra/database";
import { EventRoutes } from "./routes/event.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

class App {
	public app: Application;
	private eventRoutes = new EventRoutes();

	constructor() {
		this.app = express();
		this.middlewaresInitialize();
		this.initializeRoutes();
		this.interceptionError();
		connect();
	}

	private initializeRoutes() {
		this.app.use("/events", this.eventRoutes.router);
	}

	private interceptionError() {
		this.app.use(errorMiddleware);
	}

	private middlewaresInitialize() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	listen() {
		this.app.listen(3333, () => {
			console.log("server is running...");
		});
	}
}

export { App };
