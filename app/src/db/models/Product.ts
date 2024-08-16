import db from "../config/mongodb";

class Product {
  static collection() {
    return db.collection("products");
  }
  static async getAllProducts() {
    console.log("masuk model");

    return this.collection().find().toArray();
  }
  static async findBySlug(slug: string) {
    return this.collection().findOne({
      slug,
    });
  }
}

export default Product;
