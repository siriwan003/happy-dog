import app from "./app.js";
import dotenv from "dotenv";
import { connectMongo } from "./libs/mongo.js";

dotenv.config({ quiet: true});

const PORT = process.env.PORT || 5000;

async function startServer() {
    await connectMongo(process.env.MONGO_URI);

    app.listen(PORT, () => {
        console.log(`Server runing  http://localhost:${PORT}`);
        
    })
}
startServer();
