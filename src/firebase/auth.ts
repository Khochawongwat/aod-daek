import { getAuth } from "@firebase/auth";
import app from "./fireapp";

export const FirebaseAuth = getAuth(app)