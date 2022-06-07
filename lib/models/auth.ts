import isAfter from "date-fns/isAfter";
import { firestore } from "lib/firebase";
const collection = firestore.collection("auth");
export class Auth {
  ref: FirebaseFirestore.DocumentReference;
  data: FirebaseFirestore.DocumentData;
  id: string;
  constructor(id) {
    this.ref = collection.doc(id);
    this.id = id;
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  async push() {
    this.ref.update(this.data);
  }
  static async findByEmail(email: string) {
    const clearEmail = Auth.clearEmail(email);
    const results = await collection.where("email", "==", clearEmail).get();
    if (results.docs.length) {
      const auth = new Auth(results.docs[0].id);
      auth.data = results.docs[0].data();
      return auth;
    } else {
      return null;
    }
  }
  isExpired() {
    this.pull();
    const now = new Date();
    const expires = this.data.expires.toDate();
    return isAfter(now, expires);
  }
  static async createNewAuth(data: {
    email: string;
    userId: string;
    code: string;
    expires: any;
  }) {
    const newAuthSnap = await collection.add(data);
    const newAuth = new Auth(newAuthSnap.id);
    newAuth.data = data;
    return newAuth;
  }

  static clearEmail(email: string) {
    const clearEmail = email.trim().toLowerCase();
    return clearEmail;
  }
  static async findByEmailAndCode(email: string, code: number) {
    const clearEmail = Auth.clearEmail(email);
    const results = await collection
      .where("email", "==", clearEmail)
      .where("code", "==", code)
      .get();
    const auth = new Auth(results.docs[0].id);
    auth.data = results.docs[0].data();
    return auth;
  }
}
