/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

import { User as GeneratedUser } from "../../graphql/exercises.types";

/**
 * Use this interface instead to have _id as ObjectId
 */
export interface User extends GeneratedUser {
  _id: ObjectId;
}

/**
 * id is facultative for MongooseDocument
 */
export interface UserDocument extends User, Document {
  _id: ObjectId;
  id: string;
}
