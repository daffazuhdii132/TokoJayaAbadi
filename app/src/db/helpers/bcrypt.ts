import bcrypt from "bcryptjs";

function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}
function comparePassword(password: string, hashed: string) {
  return bcrypt.compareSync(password, hashed);
}
export { hashPassword, comparePassword };
