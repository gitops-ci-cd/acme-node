import request from "supertest";
import { describe, it } from "mocha";
import app from "../src/app.js";

describe("GET /hello", () => {
  it("should return Hello, World!", (done) => {
    request(app)
      .get("/hello")
      .expect("Content-Type", /text/)
      .expect(200, "Hello, World!", done);
  });

  it("should respect query parameters", (done) => {
    request(app)
      .get("/hello?audience=Bob")
      .expect("Content-Type", /text/)
      .expect(200, "Hello, Bob!", done);
  });
});

describe("GET /nonexistent", () => {
  it("should return 404 for non-existent routes", (done) => {
    request(app)
      .get("/nonexistent")
      .expect(404, "Route not found", done);
  });
});

describe("GET /boom", () => {
  it("should return 500 when an error is thrown", (done) => {
    request(app)
      .get("/boom")
      .expect(500, "Something went wrong!", done);
  });
});
