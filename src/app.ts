import express from "express";
require('dotenv').config()
import sequelize from "./db";
import models from "./models";
import cors from "cors";
import errorHandler from "./middleware/errorHandlerMiddleware";
import router from "./routes";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);


// Should be the last middleware
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate().then(() => console.log('Connection has been established successfully.'));
        Object.assign(models, sequelize.models); // fixed ts compiler
        await sequelize.sync().then(() => console.log('Database synced'));
        app.listen(PORT, () => console.log(`Listening on port ${PORT}....`));
    } catch (e) {
        console.log(e);
    }
}

start();
