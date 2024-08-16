import db from "../config/mongodb";
import { hashPassword } from "../helpers/bcrypt";
import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

type UserType = z.infer<typeof UserSchema>;

class User {
  static collection() {
    return db.collection<UserType>("users");
  }
  static async findUserByEmail(email: string) {
    const findUser = await this.collection().findOne({
      email: email,
    });
    return findUser;
  }
  static async findUserByUsername(username: string) {
    const findUser = await this.collection().findOne({
      username: username,
    });
    return findUser;
  }
  static async create(payload: UserType) {
    const parsedData = UserSchema.safeParse(payload);
    if (!parsedData.success) {
      throw parsedData.error;
    }
    payload.password = hashPassword(payload.password);
    await this.collection().insertOne(payload);
    return "Register success";
  }
}
export default User;
