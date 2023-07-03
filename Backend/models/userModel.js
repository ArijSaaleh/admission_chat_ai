const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude the password field by default
  },
  role: {
    type: String,
    enum: ['admin', 'candidate'],
    default: 'candidate',
  },
  administrativeID: {
    type: String,
    required: function () {
      return this.role === 'admin';
    },
    unique: function () {
      return this.role === 'admin';
    },
  },
  passedInterview: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  try {
    if (!user.password) {
      throw new Error('No password found for user');
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  } catch (error) {
    // Handle error if bcrypt comparison fails or password is missing
    throw new Error('Error comparing passwords: ' + error.message);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
