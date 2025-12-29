import express from 'express';
import userRouter from "./routes/userRoutes";
import postRouter from './routes/postRoutes';
import commentRouter from './routes/commentRoutes';

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => res.send('Hello Prisma + Express!'));

//User Routes //
app.use("/users", userRouter);
// Post Routes //
app.use("/posts", postRouter);
// Comment Routes //
app.use("/comments", commentRouter);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
