import express from 'express';
import { CreateVendor } from '../controllers';

const router = express.Router();

router.get("/Vendor", CreateVendor)

export { router as AdminRoute }