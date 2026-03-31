const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

connectDB();

const products = [
  { name: "iPhone 17 Pro Max", price: 2750000, storage: "512GB Titanium Gray", brand: "Apple", image: "iPhone 17 pro max.jpeg", badge: "Latest", tags: ["premium", "camera"] },
  { name: "iPhone 17 Pro", price: 2350000, storage: "256GB", brand: "Apple", image: "iphone17.jpeg", badge: "New", tags: ["performance"] },
  { name: "Samsung Galaxy S26 Ultra", price: 2450000, storage: "512GB", brand: "Samsung", image: "samsung-s26-ultra.jpg", badge: "Flagship", tags: ["camera"] },
  { name: "Google Pixel 10 Pro", price: 1850000, storage: "256GB", brand: "Google", image: "pixel10.jpg", badge: "AI", tags: ["ai"] },
  { name: "OnePlus 12 Pro", price: 1950000, storage: "512GB", brand: "OnePlus", image: "OnePlus 12 Pro.jpg", badge: "Hot", tags: ["performance"] },
  { name: "iPhone 17", price: 1750000, storage: "128GB", brand: "Apple", image: "iphone17.jpeg", badge: "New", tags: ["performance"] },
  { name: "Samsung Galaxy S26", price: 1650000, storage: "128GB", brand: "Samsung", image: "samsung-s26.jpg", badge: "Flagship", tags: ["camera"] },
  { name: "Google Pixel 10", price: 1350000, storage: "128GB", brand: "Google", image: "pixel10.jpg", badge: "AI", tags: ["ai"] },
  { name: "OnePlus 12", price: 1450000, storage: "256GB", brand: "OnePlus", image: "OnePlus 12.jpg", badge: "Hot", tags: ["performance"] }
];

const seedDatabase = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    const adminExists = await User.findOne({ email: "test@estore.rw" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "test@estore.rw",
        password: "test123",
        role: "admin",
        phone: "+250788123456"
      });
    }

    console.log("✅ Seeding completed! Admin account: test@estore.rw / test123");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();