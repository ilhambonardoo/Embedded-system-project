import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString(
        "utf-8"
      )
    );
  } catch (err) {
    console.error(
      "❌ Failed to decode FIREBASE_SERVICE_ACCOUNT_KEY from env",
      err
    );
    process.exit(1);
  }
} else {
  console.error(
    "❌ FIREBASE_SERVICE_ACCOUNT_KEY not found in environment variables"
  );
  console.error(
    "   Set it in .env file or deploy platform (Railway, Vercel, etc)"
  );
  console.error(
    "   Generate it with: cat backend/serviceAccountKey.json | base64"
  );
  process.exit(1);
}

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
