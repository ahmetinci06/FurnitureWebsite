# Mobilya Furniture Store

Modern furniture e-commerce website inspired by Vivense.com. Built with Next.js, React 18, and Tailwind CSS.

## Features

- 🛋️ Product listing with category filters
- 📦 Product detail pages
- 🛒 Shopping cart functionality
- 💳 Mock checkout flow (ready for Nasspay IQ integration)
- 📱 Fully responsive design
- 🎨 Clean, minimal, Vivense-inspired aesthetics

## Tech Stack

- **Frontend:** Next.js (React 18)
- **Styling:** Tailwind CSS
- **Backend:** Next.js API routes
- **Storage:** Local JSON file
- **Runtime:** npm

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
/pages
  index.js              → Product listing page
  /product/[id].js      → Product detail page
  cart.js               → Shopping cart
  checkout.js           → Checkout page
  success.js            → Payment success page
  /api
    checkout.js         → Mock checkout endpoint

/data
  products.json         → Product database

/utils
  nasspay.js            → Mock payment helper

/public
  /images               → Product images (uploaded by Ahmet)

/styles
  globals.css           → Global styles
```

## Adding Product Images

1. Place product images in `/public/images/`
2. Ensure filenames match the `image_url` in `data/products.json`
3. Supported formats: JPG, PNG, WEBP

Example:
- File: `/public/images/sofa_set_1.jpg`
- JSON: `"image_url": "/images/sofa_set_1.jpg"`

## Mock Payment Integration

Currently using mock endpoints that simulate the Nasspay IQ payment flow:

- Mock checkout: `/api/checkout`
- Mock payment helper: `/utils/nasspay.js`

**For Production:** Replace mock functions in `nasspay.js` with real Nasspay IQ API calls.

## Categories

- Living Room
- Bedroom
- Dining Room
- Outdoor Furniture

## Environment Variables

Create `.env.local` file:

```
NASS_API_KEY=your_actual_api_key_here
```

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Local Production

```bash
npm run build
npm start
```

## License

Private project for internal use.
