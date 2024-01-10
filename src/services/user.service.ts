import * as bcrypt from "bcrypt";
import User, { UserRole } from "../entities/User.entity";

class UserService {
  async createUser(
    username: string,
    email: string,
    password: string,
    role: UserRole,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role, // Set the role here
    }).save();
    return user;
  }

  async getUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async comparePasswords(candidatePassword: string, hashedPassword: string) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
}

export default new UserService();
