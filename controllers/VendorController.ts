import { NextFunction, Request, Response } from "express";
import { VendorLoginInput } from "../dto";
import { FindVendor } from "./AdminController";

export const VendorLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = <VendorLoginInput>req.body;

  const existingVendor = await FindVendor(undefined, email);

  if (existingVendor !== null) {
    // validate and give access
  }

  return res.json({ message: "Login credenital not valid" });
};
