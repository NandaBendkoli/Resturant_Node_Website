db.createCollection("User", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "price"],
      properties: {
        name: {
          bsonType: "string",
          description: "Must be a string and required!"
        },
        price: {
          bsonType: "number",
          description: "Must be a number and required!"
        }
      }
    }
  }
});