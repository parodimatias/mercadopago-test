import { firestore } from "lib/firebase";
const collection = firestore.collection("products");
interface ProductData {
  title: string;
  unit_price: number;
  description: string;
  picture_url: string;
  currency_id: string;
  category_id: string;
}
export class Product {
  ref: FirebaseFirestore.DocumentReference;
  data: ProductData;
  id: string;
  constructor(id) {
    this.ref = collection.doc(id);
    this.id = id;
  }
  async pull() {
    const snap = await this.ref.get();
    this.data = snap.data() as ProductData;
  }
  async push() {
    this.ref.update(this.data);
  }
  static async createNewProduct(data) {
    const newProductSnap = await collection.add(data);
    const newProduct = new Product(newProductSnap.id);
    newProduct.data = data;
    return newProduct;
  }
}
