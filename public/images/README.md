# Product Images Directory

This directory is for storing product images that will be displayed on the website.

## Image Requirements

- **Format:** JPG, PNG, or WEBP
- **Recommended Size:** 1200x900 pixels (4:3 aspect ratio)
- **Maximum File Size:** 2MB per image
- **Quality:** High resolution for best display

## Image Naming Convention

Image filenames should match exactly with the `image_url` specified in `/data/products.json`

### Current Product Images Needed:

1. **sofa_set_1.jpg** - Modern Grey Sofa Set
2. **bedroom_1.jpg** - Luxury Bedroom Set
3. **outdoor_set_1.jpg** - Outdoor Rattan Dining Set
4. **dining_table_1.jpg** - Classic Wooden Dining Table
5. **tv_unit_1.jpg** - Minimalist TV Unit
6. **bed_frame_1.jpg** - King Size Bed Frame
7. **garden_lounge_1.jpg** - Garden Lounge Set
8. **coffee_table_1.jpg** - Marble Coffee Table
9. **wardrobe_1.jpg** - Wardrobe with Mirror
10. **dining_set_1.jpg** - Extendable Dining Set

## How to Add Images

1. Save your product images to this directory (`/public/images/`)
2. Ensure the filename matches the corresponding entry in `/data/products.json`
3. The images will automatically appear on the website
4. No code changes required

## Example

If you have a product in `products.json` with:
```json
{
  "id": 1,
  "name": "Modern Grey Sofa Set",
  "image_url": "/images/sofa_set_1.jpg"
}
```

Then save your image as: `/public/images/sofa_set_1.jpg`

## Tips

- Use descriptive, high-quality images
- Ensure good lighting and clear product visibility
- White or neutral backgrounds work best
- Show multiple angles if possible
- Compress images to reduce file size while maintaining quality

## Need Help?

Contact the development team if you have any questions about image specifications.
