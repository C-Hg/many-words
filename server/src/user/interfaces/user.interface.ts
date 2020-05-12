/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

import { User as GeneratedUser } from "../../graphql/exercises.types";

/**
 * Use this interface instead of the generated one
 * to narrow _id to ObjectId and have a mandatory id as string
 */
export interface User extends GeneratedUser {
  _id: ObjectId;
}

export interface UserDocument extends User, Document {
  _id: ObjectId;
  id: string;
}
