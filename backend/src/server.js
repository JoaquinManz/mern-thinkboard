import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
import rateLimiter from './middleware/rateLimiter.js';
import { connectDB } from './config/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// middleware
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json()); //this middleware will parse the json bodies: req.body
app.use(rateLimiter);

/*          Simple logging middleware
app.use((req, res, next) => {
    console.log(`Req method is ${req.method} & Req url is ${req.url}`);
    next();
    })
    */
   
   app.use("/api/notes", notesRoutes)
   
   //a good practice to have in production, connecting first the db then the app
   connectDB().then(() => {
       app.listen(PORT, () => {
           console.log('Server started on PORT:', PORT);
       });
   });


