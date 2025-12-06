import admin from "firebase-admin";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const serviceAccountPath =
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "./serviceAccountKey.json";

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ Service account key not found:", serviceAccountPath);
  console.error(
    "   Please download from Firebase Console → Project Settings → Service Accounts"
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

const dbUrl = process.env.FIREBASE_DB_URL;
const appOptions: admin.AppOptions = dbUrl
  ? {
      credential: admin.credential.cert(serviceAccount),
      databaseURL: dbUrl,
    }
  : {
      credential: admin.credential.cert(serviceAccount),
    };

admin.initializeApp(appOptions);

export const db = admin.database();
