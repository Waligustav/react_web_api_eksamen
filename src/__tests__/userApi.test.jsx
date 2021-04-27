const request = require("supertest");

const express = require("express");

const app = express();
app.use(require("body-parser").json());
app.use(require("../server/routes/userApi"));

describe("user API", () => {
  it("Returns API contents", async () => {
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.find(({ id }) => id === 2)).toMatchObject({
          firstName: "Vengt",
        });
      });
  });

  it("Creates a new user", async () => {
    await request(app)
      .post("")
      .send({
        firstName: "Jean",
        lastName: "D'knark de Orleans",
        email: "jean@allsaints.fr",
      })
      .expect(201);
    await request(app)
      .get("")
      .then((response) => {
        expect(response.body.map(({ firstName }) => firstName)).toContain(
          "Jean"
        );
      });
  });
});
