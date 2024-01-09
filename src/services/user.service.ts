import * as bcrypt from "bcrypt";
import User from "../entities/User.entity";

class UserService {
  async createUser(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
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
