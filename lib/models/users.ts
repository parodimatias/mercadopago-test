import { firestore } from "lib/firebase";
const collection = firestore.collection("users");
export class User {
  ref: FirebaseFirestore.DocumentReference;
  data: any;
  id: string;
  constructor(id) {
    this.ref = collection.doc(id);
    this.id = id;
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data();
  }
  static async createNewUser(data: { email: string }) {
    const newUserSnap = await collection.add(data);
    const newUser = new User(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
}
