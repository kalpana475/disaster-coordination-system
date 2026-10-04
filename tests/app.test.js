const request = require("supertest");
const app = require("../src/server");

describe("Disaster Coordination System API", () => {

  // Test 1
  test("GET /api/disasters should return disasters", async () => {
    const response = await request(app)
      .get("/api/disasters");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });


  // Test 2
  test("POST /api/disasters should create a disaster", async () => {
    const response = await request(app)
      .post("/api/disasters")
      .send({
        type: "Earthquake",
        location: "Delhi",
        severity: "High",
        affectedPeople: 500
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message)
      .toBe("Disaster reported successfully");

    expect(response.body.disaster.type)
      .toBe("Earthquake");
  });


  // Test 3
  test("POST /api/disasters should reject missing fields", async () => {
    const response = await request(app)
      .post("/api/disasters")
      .send({
        type: "Flood"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message)
      .toBe("All disaster fields are required");
  });


  // Test 4
  test("GET /api/rescue-teams should return rescue teams", async () => {
    const response = await request(app)
      .get("/api/rescue-teams");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    expect(response.body.length).toBeGreaterThan(0);
  });


  // Test 5
  test("GET /api/resources should return emergency resources", async () => {
    const response = await request(app)
      .get("/api/resources");

    expect(response.statusCode).toBe(200);

    expect(response.body).toHaveProperty("medicalKits");
    expect(response.body).toHaveProperty("ambulances");
  });

});