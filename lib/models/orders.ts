import { firestore } from "lib/firebase";
const collection = firestore.collection("orders");
type OrderData = {
  userId: string;
  productId: string;
  quantity: number;
  status: "pending" | "closed";
};
export class Order {
  ref: FirebaseFirestore.DocumentReference;
  data: OrderData;
  id: string;

  constructor(id) {
    this.ref = collection.doc(id);
    this.id = id;
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data() as OrderData;
  }
  async push() {
    this.ref.update(this.data);
  }
  static async createNewOrder(data: OrderData) {
    const newOrderSnap = await collection.add(data);
    const newOrder = new Order(newOrderSnap.id);
    newOrder.data = data;
    return newOrder;
  }
}
