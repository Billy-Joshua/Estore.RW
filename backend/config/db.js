const dns = require('node:dns');

// Fix for querySrv ECONNREFUSED error on Windows
dns.setServers(['1.1.1.1', '8.8.8.8']);   // Cloudflare + Google DNS

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;