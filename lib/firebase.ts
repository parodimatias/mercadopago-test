import admin from "firebase-admin";
var serviceAccount = JSON.parse(process.env.FIREBASE_CONNECTION);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
export const firestore = admin.firestore();
