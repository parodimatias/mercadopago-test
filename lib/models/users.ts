import { firestore } from "lib/firebase";
const collection = firestore.collection("users");
type UserData = {
  email: string;
};
export class User {
  ref: FirebaseFirestore.DocumentReference;
  data: UserData;
  id: string;
  constructor(id) {
    this.ref = collection.doc(id);
    this.id = id;
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data() as UserData;
  }
  async push() {
    this.ref.update(this.data);
  }
  static async createNewUser(data: UserData) {
    const newUserSnap = await collection.add(data);
    const newUser = new User(newUserSnap.id);
    newUser.data = data;
    return newUser;
  }
}
