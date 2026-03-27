const path = require('node:path');
const admin = require('firebase-admin');

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  console.error('Missing FIREBASE_SERVICE_ACCOUNT_PATH in environment.');
  console.error('Set it to your service account JSON path, e.g. C:/keys/serviceAccountKey.json');
  process.exit(1);
}

const resolvedPath = path.resolve(serviceAccountPath);

let serviceAccount;
try {
  serviceAccount = require(resolvedPath);
} catch (error) {
  console.error(`Unable to read service account JSON at: ${resolvedPath}`);
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

console.log('Firebase Admin initialized successfully.');
module.exports = admin;
