import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default function connectDB() {
  try {
    const url = process.env.URL_MONGODB;

    if (!url) {
      throw new Error("URL do MongoDB não especificada no arquivo .env");
    }

    mongoose.connect(url);

    const dbConnection = mongoose.connection;

    dbConnection.once("open", () => {
      console.log(`Database connected`);
    });

    dbConnection.on("error", (err) => {
      console.error(`Database connection error: ${err}`);
    });
  } catch (error: any) {
    console.error(`Erro ao conectar ao banco de dados: ${error.message}`);
    process.exit(1);
  }
}
