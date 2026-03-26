const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bus Ticketing API",
      version: "1.0.0",
      description: "API for bus ticket booking system"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Ticket: {
          type: "object",
          properties: {
            seatNumber: { type: "integer" },
            status: { type: "string", enum: ["OPEN", "BOOKED"] },
            user: {
              type: "object",
              properties: {
                name: { type: "string" },
                age: { type: "integer" },
                gender: { type: "string" }
              }
            },
            bookedAt: { type: "string", format: "date-time" }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJSDoc(options);