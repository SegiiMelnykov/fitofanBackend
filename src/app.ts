import express from "express";
import { sequelize } from "./db";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Listening on port ${PORT}....`));

    } catch (e) {
        console.log(e);
    }
}


start();
