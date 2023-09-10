import { CACHE_SIZE_UNLIMITED, getFirestore, initializeFirestore, persistentLocalCache } from "@firebase/firestore";
import app from "./fireapp";

initializeFirestore(app, {
    localCache: persistentLocalCache({
        cacheSizeBytes: CACHE_SIZE_UNLIMITED
    })
});

export const FirestoreDatabase = getFirestore(app)