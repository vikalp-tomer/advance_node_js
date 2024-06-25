import { NextFunction, Request, Response } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    const vendor = await Vendor.findOne({ email });
    return vendor;
  } else {
    const vendor = await Vendor.findById(id);
    return vendor;
  }
};

export const CreateVendor = async (req: Request, res: Response, next: NextFunction) => {
  const { name, address, email, foodTypes, ownerName, password, phone, pincode } = <CreateVendorInput>req.body;

  const existingVendor = await FindVendor(undefined, email);
  if (existingVendor !== null) {
    return res.json({ message: "Vendor already exists" });
  }

  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  const createdVendor = await Vendor.create({
    name,
    address,
    email,
    foodTypes,
    ownerName,
    password: userPassword,
    phone,
    pincode,
    rating: 0,
    coverImages: [],
    serviceAvailable: false,
    salt,
  });

  return res.json(createdVendor);
};

export const GetVendors = async (req: Request, res: Response, next: NextFunction) => {
  const vendors = await Vendor.find({});

  if (vendors !== null) {
    return res.json(vendors);
  }
  return res.json({ message: "No vendors found" });
};

export const GetVendorByID = async (req: Request, res: Response, next: NextFunction) => {
  const vendorId = req.params.id;

  const vendor = await FindVendor(vendorId);
  if (vendor !== null) {
    return res.json(vendor);
  }
  return res.json({ message: "No vendor found" });
};
