# Setup Guide - Mobilya Furniture Store

Complete setup instructions for the Mobilya e-commerce project.

## Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Comes with Node.js
- **Code Editor**: VS Code recommended

## Initial Setup

### 1. Install Dependencies

Open terminal in the project root directory and run:

```bash
npm install
```

This will install all required packages including:
- Next.js
- React
- Tailwind CSS
- And other dependencies

### 2. Environment Variables

The `.env.local` file is already created with placeholder values:

```
NASS_API_KEY=mock_api_key_placeholder_for_future_integration
```

**Note:** This is currently a mock value. When ready to integrate real Nasspay IQ payment, replace this with the actual API key.

### 3. Add Product Images

Product images should be added to `/public/images/` directory:

1. Navigate to `/public/images/`
2. Read the `README.md` in that directory for image specifications
3. Add images with filenames matching the `image_url` in `/data/products.json`

**Required images:**
- sofa_set_1.jpg
- bedroom_1.jpg
- outdoor_set_1.jpg
- dining_table_1.jpg
- tv_unit_1.jpg
- bed_frame_1.jpg
- garden_lounge_1.jpg
- coffee_table_1.jpg
- wardrobe_1.jpg
- dining_set_1.jpg

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

Features in development mode:
- Hot reload (changes appear automatically)
- Detailed error messages
- Development tools enabled

### Production Build

Build the application for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
MobilyaSite/
├── pages/                  # Next.js pages
│   ├── _app.js            # App wrapper with layout
│   ├── _document.js       # HTML document structure
│   ├── index.js           # Home page (product listing)
│   ├── cart.js            # Shopping cart page
│   ├── checkout.js        # Checkout page
│   ├── success.js         # Payment success page
│   ├── product/
│   │   └── [id].js       # Dynamic product detail page
│   └── api/
│       └── checkout.js    # Checkout API endpoint
│
├── data/
│   └── products.json      # Product database
│
├── utils/
│   ├── nasspay.js        # Payment helper (mock)
│   └── cart.js           # Cart management utilities
│
├── styles/
│   └── globals.css       # Global styles + Tailwind
│
├── public/
│   └── images/           # Product images directory
│
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
└── .env.local           # Environment variables
```

## Features

### Current Features

✅ Product listing with category filters  
✅ Product detail pages  
✅ Shopping cart functionality  
✅ Add/remove/update cart items  
✅ Checkout form with validation  
✅ Mock payment integration  
✅ Success page after checkout  
✅ Responsive design (mobile, tablet, desktop)  
✅ Turkish Lira (₺) price formatting  

### Mock Features (To Be Replaced)

⚠️ **Payment Processing** - Currently using mock Nasspay IQ integration  
⚠️ **Product Images** - Placeholder icons until images are uploaded  

## Adding New Products

Edit `/data/products.json` and add a new product object:

```json
{
  "id": 11,
  "name": "New Product Name",
  "category": "living-room",
  "price": 50000,
  "description": "Short product description.",
  "image_url": "/images/new_product.jpg"
}
```

Categories: `living-room`, `bedroom`, `dining-room`, `outdoor`

Price: In Turkish Lira (without decimals)

## Nasspay IQ Integration (Future)

Currently, the payment system uses mock endpoints. To integrate real Nasspay IQ:

1. **Get API Credentials**
   - Obtain API key from Nasspay IQ
   - Update `NASS_API_KEY` in `.env.local`

2. **Update Payment Utilities**
   - Edit `/utils/nasspay.js`
   - Replace mock functions with real API calls
   - Follow Nasspay IQ API documentation

3. **Update API Endpoint**
   - Modify `/pages/api/checkout.js` if needed
   - Add proper error handling
   - Implement webhook handlers for payment confirmation

4. **Test Integration**
   - Test with Nasspay IQ sandbox
   - Verify payment flow
   - Test error scenarios

## Deployment Options

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy.

### Option 2: Local Production Server

```bash
npm run build
npm start
```

Runs on port 3000 by default.

### Option 3: Other Hosting

Build the project and deploy the `.next` folder along with:
- `public/` directory
- `package.json`
- `.env.local` (with production values)

## Troubleshooting

### Issue: npm install fails

**Solution:** 
- Ensure Node.js 16+ is installed
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Issue: Port 3000 is already in use

**Solution:**
- Stop other processes using port 3000
- Or specify a different port: `npm run dev -- -p 3001`

### Issue: Images not showing

**Solution:**
- Check image filenames match exactly with `products.json`
- Ensure images are in `/public/images/` directory
- Restart development server

### Issue: Cart not persisting

**Solution:**
- Cart uses localStorage
- Check browser console for errors
- Clear browser cache and try again

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Images are lazy-loaded
- CSS is optimized by Tailwind
- Next.js automatically code-splits pages
- Static assets are cached

## Support & Maintenance

### Regular Maintenance

- Keep dependencies updated: `npm update`
- Monitor console for warnings
- Test checkout flow regularly
- Backup product data periodically

### Getting Help

For technical issues:
1. Check browser console for errors
2. Review this setup guide
3. Check Next.js documentation
4. Contact development team

## Next Steps

1. ✅ Complete initial setup
2. ✅ Run development server
3. 📝 Add product images
4. 📝 Test all features
5. 📝 Prepare for Nasspay IQ integration
6. 📝 Deploy to production

---

**Project Status:** Ready for development and testing  
**Last Updated:** 2024  
**Version:** 1.0.0
