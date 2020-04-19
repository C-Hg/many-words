/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongodb";
import { Document } from "mongoose";

import { User as GeneratedUser } from "../../graphql/types";

// strict interface : use this interface instead of the generated one
export interface User extends GeneratedUser {
  _id: ObjectId;
  id: string;
}

// non-strict interface to be compatible with MongooseDocument
interface UserWithOptionalId extends GeneratedUser {
  id?: any;
}

export interface UserDocument extends UserWithOptionalId, Document {}
