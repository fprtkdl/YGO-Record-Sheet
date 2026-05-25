import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import path from "path";

const CRED_PATH = path.join(
  process.cwd(),
  process.env.FIREBASE_ADMIN_CREDENTIALS_PATH || "./firebase-admin.json",
);

let app: App;
if (!getApps().length) {
  app = initializeApp({
    credential: cert(CRED_PATH),
  });
} else {
  app = getApps()[0];
}

export const adminAuth = getAuth(app);
