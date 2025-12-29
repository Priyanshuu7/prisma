import express from 'express';
import userRouter from "./routes/userRoutes";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => res.send('Hello Prisma + Express!'));

//User Routes //
app.use("/users", userRouter);










app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
