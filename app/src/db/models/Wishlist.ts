import { z } from "zod";
import db from "../config/mongodb";
import { ObjectId } from "mongodb";

const WishlistSchema = z.object({
  userId: z.instanceof(ObjectId),
  productId: z.instanceof(ObjectId),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type WishlistType = {
  userId: ObjectId;
  productId: ObjectId;
  createdAt?: string;
  updatedAt?: string;
};

class Wishlist {
  static collection() {
    return db.collection<WishlistType>("wishlists");
  }
  static async deleteById(id: string) {
    await this.collection().deleteOne({
      _id: new ObjectId(String(id)),
    });
    return "Delete wishlist success";
  }

  static async create(payload: WishlistType) {
    const parsedData = WishlistSchema.safeParse(payload);
    if (!parsedData.success) {
      throw parsedData.error;
    }
    await this.collection().insertOne(parsedData.data);
    return "Add to wishlist success";
  }
  static async findByProductId(payload: { productId: string; userId: string }) {
    const { productId, userId } = payload;
    return this.collection().findOne({
      productId: new ObjectId(String(productId)),
      userId: new ObjectId(String(userId)),
    });
  }

  static async findByUserId(userId: string) {
    const agg = [
      {
        $match: {
          userId: new ObjectId(String(userId)),
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetail",
        },
      },
      {
        $unwind: {
          path: "$productDetail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ];
    return this.collection().aggregate(agg).toArray();
  }
}

export default Wishlist;
