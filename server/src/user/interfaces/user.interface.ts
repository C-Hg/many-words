/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

import { User as GeneratedUser } from "../../graphql/learn.types";

/**
 * Use this interface instead to have the properties not sent to the client
 */
export interface User extends GeneratedUser {
  _id: ObjectId;
  login: {
    emailToConfirm?: string;
    expiresAt: number;
    totp: number;
  };
}

/**
 * id is facultative for MongooseDocument
 */
export interface UserDocument extends User, Document {
  _id: ObjectId;
  id: string;
}
