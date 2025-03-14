import router from './routes/user.routes';
import express from 'express';

const app = express();

app.use(express.json());
app.use("/user", router);

app.listen(3000, () => console.log("Server running 3000"));