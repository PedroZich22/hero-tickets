import request from "supertest";
import { App } from "../app";
import { EventUseCase } from "../useCases/EventUseCase";
import { Event } from "../entities/Event";
import crypto from "node:crypto";

const app = new App();
const express = app.app;

describe("Event test", () => {
	it("/POST Event", async () => {
		const event = {
			title: "Jorge e Mateus",
			price: [{ sector: "Pista", amount: "20" }],
			categories: ["Show"],
			description: "Evento descrição",
			city: "Belo Horizonte",
			location: {
				latitude: "-19.8658618",
				longitude: "-43.9737063",
			},
			coupons: [],
			date: new Date(),
			participants: [],
		};

		const response = await request(express)
			.post("/events")
			.field("title", event.title)
			.field("description", event.description)
			.field("city", event.city)
			.field("coupons", event.coupons)
			.field("categories", event.categories)
			.field("location[latitude]", event.location.latitude)
			.field("location[longitude]", event.location.longitude)
			.field("date", event.date.toISOString())
			.field("price[sector]", event.price[0].sector)
			.field("price[amount]", event.price[0].amount)
			.attach("banner", "/Users/pedro/Downloads/banner.png")
			.attach("flyers", "/Users/pedro/Downloads/flyer1.png")
			.attach("flyers", "/Users/pedro/Downloads/flyer2.png");

		if (response.error) {
			console.log("🚀 ~ file: Events.test.ts:34 ~ it ~ error:", response.error);
		}

		expect(response.status).toBe(201);
		expect(response.body).toEqual({ message: "Evento criado com sucesso." });
	});
	it("/GET/:id Event by id", async () => {
		const response = await request(express).get(
			"/events/64d694ad2235e2b434a1748c"
		);

		if (response.error) {
			console.log("🚀 ~ file: Events.test.ts:34 ~ it ~ error:", response.error);
		}

		expect(response.status).toBe(200);
	});
	it("/GET Event by location", async () => {
		const response = await request(express).get(
			"/events?latitude=-19.8658618&longitude=-43.9737063"
		);

		if (response.error) {
			console.log("🚀 ~ file: Events.test.ts:34 ~ it ~ error:", response.error);
		}

		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThan(0);
	});
	it("/GET Event by category", async () => {
		const response = await request(express).get("/events/category/Show");

		if (response.error) {
			console.log("🚀 ~ file: Events.test.ts:34 ~ it ~ error:", response.error);
		}

		expect(response.status).toBe(200);
		expect(response.body.length).toBeGreaterThan(0);
	});
	it("/POST Event insert user", async () => {
		const response = await request(express)
			.post("/events/64d694ad2235e2b434a1748c/participants")
			.send({
				name: "Alexia",
				email: crypto.randomBytes(10).toString("hex") + "@teste.com",
			});

		if (response.error) {
			console.log("🚀 ~ file: Events.test.ts:34 ~ it ~ error:", response.error);
		}

		expect(response.status).toBe(200);
	});
});

const eventRepository = {
	add: jest.fn(),
	findEventsByCity: jest.fn(),
	findEventsByCategory: jest.fn(),
	findEventsByName: jest.fn(),
	findByLocationAndDate: jest.fn(),
	findEventById: jest.fn(),
	update: jest.fn(),
};

const eventUseCase = new EventUseCase(eventRepository);
const event: Event = {
	title: "Jorge e Mateus",
	price: [{ sector: "Pista", amount: "20" }],
	categories: ["Show"],
	description: "Evento descrição",
	city: "Belo Horizonte",
	location: {
		latitude: "-19.8658618",
		longitude: "-43.9737063",
	},
	banner: "banner.png",
	flyers: ["flyer1.png", "flyer2.png"],
	coupons: [],
	date: new Date(),
	participants: [],
};

describe("Unit Test", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return an array of events by category", async () => {
		eventRepository.findEventsByCategory.mockResolvedValue([event]);
		const result = await eventUseCase.findEventsByCategory("Show");

		expect(result).toEqual([event]);
		expect(eventRepository.findEventsByCategory).toHaveBeenCalledWith("Show");
	});

	it("should return an array of events by name", async () => {
		eventRepository.findEventsByName.mockResolvedValue([event]);
		const result = await eventUseCase.findEventsByName("Jorge e Mateus");

		expect(result).toEqual([event]);
		expect(eventRepository.findEventsByName).toHaveBeenCalledWith(
			"Jorge e Mateus"
		);
	});

	it("should return a event by id", async () => {
		eventRepository.findEventById.mockResolvedValue(event);
		const result = await eventUseCase.findEventById("64d523a332cb063562260315");

		expect(result).toEqual(event);
		expect(eventRepository.findEventById).toHaveBeenCalledWith(
			"64d523a332cb063562260315"
		);
	});
});
