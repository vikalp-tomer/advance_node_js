import { NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, email, foodTypes, ownerName, password, phone, pincode } = <CreateVendorInput>req.body;

    const existingVendor = await Vendor.findOne({ email });

    if (existingVendor !== null) {
        return res.json({ "message": "Vendor already exists" });
    }

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt)

    const createdVendor = await Vendor.create({ name, address, email, foodTypes, ownerName, password: userPassword, phone, pincode, rating: 0, coverImages: [], serviceAvailable: false, salt })

    return res.json(createdVendor)
}