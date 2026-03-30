# How to Add Products to EstoreRW 🚀

## **Option 1: Direct Database Entry (Current Method)**

### Current Products in Database:
You already have 4 products seeded:
1. **iPhone 17 Pro Max** - 2,750,000 RWF
2. **iPhone 17 Pro** - 2,350,000 RWF
3. **Samsung Galaxy S26 Ultra** - 2,450,000 RWF
4. **Google Pixel 10 Pro** - 1,850,000 RWF

### Why You Can't See Them Yet:
- The products are in the database ✅
- The backend API returns them ✅
- The frontend might be loading from **hardcoded data** instead of the API

---

## **Option 2: Add Products via API (Using Tools)**

### Step 1: Login to Get JWT Token
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@estore.rw","password":"test123"}'
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {"id": "...", "name": "Admin", "email": "test@estore.rw", "role": "admin"}
}
```

### Step 2: Add a New Product with Token
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "x-auth-token: YOUR_TOKEN_HERE" \
  -d '{
    "name": "OnePlus 15 Ultra",
    "price": 1950000,
    "storage": "512GB",
    "brand": "OnePlus",
    "image": "oneplus15-ultra.jpg",
    "badge": "New",
    "tags": ["performance", "gaming"],
    "inStock": true
  }'
```

---

## **Option 3: Add Products via MongoDB (Direct Database)**

If you have MongoDB installed locally:

```javascript
// Use MongoDB Compass or mongosh
db.products.insertOne({
  name: "OnePlus 15 Ultra",
  price: 1950000,
  storage: "512GB",
  brand: "OnePlus",
  image: "oneplus15-ultra.jpg",
  badge: "New",
  tags: ["performance", "gaming"],
  inStock: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

---

## **Step-by-Step Fix to See Products**

### 1. **Verify Backend is Running**
```bash
curl http://localhost:5000/api/products
```
You should see products JSON data.

### 2. **Check Frontend Script**
The **script-professional.js** loads products from API on page load.
It should call: `GET http://localhost:5000/api/products`

### 3. **Clear Browser Cache**
- Press `Ctrl+Shift+Delete` in your browser
- Clear cache and reload page

### 4. **Refresh the Website**
- Open: `http://localhost:3000/premium-index.html`
- Press `Ctrl+F5` (hard refresh)

---

## **Add New Product Schema**

All products need:
```json
{
  "name": "Product Name",           // Required
  "price": 1000000,                 // Required (in RWF)
  "storage": "256GB",               // Required
  "brand": "Apple",                 // Required (Apple, Samsung, Google, OnePlus, etc.)
  "image": "product.jpg",           // Required (image file name in images/ folder)
  "badge": "New/Hot/Sale/Latest",  // Optional
  "tags": ["camera", "performance"], // Optional array
  "inStock": true,                  // Optional (default: true)
  "description": "Optional text",   // Optional
  "color": "Space Gray"             // Optional
}
```

---

## **Quick Test: Add Product via API**

1. **Login and get token:**
```bash
$loginResponse = Invoke-WebRequest -Uri http://localhost:5000/api/auth/login `
  -Method POST `
  -Body '{"email":"test@estore.rw","password":"test123"}' `
  -ContentType 'application/json' -UseBasicParsing

$token = ($loginResponse.Content | ConvertFrom-Json).token
```

2. **Add product:**
```bash
Invoke-WebRequest -Uri http://localhost:5000/api/products `
  -Method POST `
  -Headers @{'x-auth-token'=$token} `
  -Body '{"name":"iPhone 15","price":1500000,"brand":"Apple","storage":"256GB","image":"iphone15.jpg","badge":"Sale"}' `
  -ContentType 'application/json'
```

3. **Refresh website** to see new product

---

## **Troubleshooting**

### Products still not visible?
1. Check browser console for errors (`F12`)
2. Verify backend is running: `curl http://localhost:5000`
3. Check if products API returns data: `curl http://localhost:5000/api/products`
4. Clear browser cache: `Ctrl+Shift+Delete`

### Login not working?
- Use credentials: `test@estore.rw` / `test123`
- This is the admin account from seeding

---

## **Need Help Adding Products?**

Let me know and I can:
1. ✅ Add products to the database directly
2. ✅ Fix the frontend to load products from API
3. ✅ Create an admin panel to add products from UI
