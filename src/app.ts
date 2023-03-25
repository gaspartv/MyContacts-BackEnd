import express from "express";
import "express-async-errors";
import cors from "cors";
import clientRoutes from "./routes/client.routes";
import sessionRoutes from "./routes/session.routes";
import contactsRoutes from "./routes/contacts.routes";
import { handleError } from "./apperror";

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/login", sessionRoutes);
app.use("/client", clientRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleError);

export default app;
