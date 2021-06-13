import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/routes/user";
import Coinpayments  from 'coinpayments';



const app = express();

const client = new Coinpayments({
  key: '356164b7ef90dda9b8803469f160d040d43f8f2e1c6d741fe2f7ba1fe152b24e',
  secret: '310d254853f3f7c50270D67072261f9F92Cb3a6C9e4bC1b60AcF90C76B1c59c6',
});

require("dotenv").config();
// middleware
app.use(express.json());
app.use("/users", userRouter)

app.get('/', async () => {
  await client.getBasicInfo();
});


// config
const PORT = process.env.PORT || 8000;
// database
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database has Connected successfully");
  })
  .catch((err) => console.log("Error", err));
app.listen(PORT, (err) =>
  err
    ? console.error(err)
    : console.log(`Your server is running on port ${PORT}`)
);
