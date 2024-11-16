import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'user'],
    default: 'user',
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Nếu mật khẩu không thay đổi, bỏ qua mã hóa
  this.password = await bcrypt.hash(this.password, 10); // Mã hóa mật khẩu với 10 vòng lặp (salt rounds)
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);