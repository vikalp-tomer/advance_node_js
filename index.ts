import express from 'express';
import { AdminRoute, VendorRoute } from './routes'
import mongoose from 'mongoose';
import { MONGO_URI } from './config';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/admin', AdminRoute);
app.use('/Vendor', VendorRoute);


mongoose.connect(MONGO_URI).then(() => console.log('MongoDB Connected')).catch((err) => console.log(err));



app.listen(8000, () => console.log('Server is running on port 8000'));