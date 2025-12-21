-- Insert categories
INSERT INTO categories (name, slug, description, image_url) VALUES
('Electronics', 'electronics', 'Latest gadgets and electronic devices', '/placeholder.svg?height=400&width=600'),
('Home & Living', 'home-living', 'Everything for your home', '/placeholder.svg?height=400&width=600'),
('Beauty & Health', 'beauty-health', 'Beauty products and health essentials', '/placeholder.svg?height=400&width=600'),
('Fashion', 'fashion', 'Trendy clothing and accessories', '/placeholder.svg?height=400&width=600'),
('Kids & Toys', 'kids-toys', 'Fun and educational toys for children', '/placeholder.svg?height=400&width=600'),
('Car Accessories', 'car-accessories', 'Accessories for your vehicle', '/placeholder.svg?height=400&width=600'),
('Health & Fitness', 'health-fitness', 'Fitness equipment and health products', '/placeholder.svg?height=400&width=600'),
('Tools & Hardware', 'tools-hardware', 'Quality tools for every job', '/placeholder.svg?height=400&width=600'),
('Gifts', 'gifts', 'Perfect gifts for any occasion', '/placeholder.svg?height=400&width=600')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, price, original_price, category_id, image_url, stock_quantity, is_featured, tags) 
SELECT 
  'Wireless Bluetooth Headphones',
  'wireless-bluetooth-headphones',
  'Premium noise-canceling wireless headphones with 30-hour battery life',
  45.00,
  60.00,
  (SELECT id FROM categories WHERE slug = 'electronics'),
  '/placeholder.svg?height=600&width=600',
  50,
  true,
  ARRAY['electronics', 'audio', 'wireless']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'wireless-bluetooth-headphones');

INSERT INTO products (name, slug, description, price, original_price, category_id, image_url, stock_quantity, is_featured, tags)
SELECT
  'Smart LED Desk Lamp',
  'smart-led-desk-lamp',
  'Adjustable LED desk lamp with wireless charging and USB port',
  35.00,
  50.00,
  (SELECT id FROM categories WHERE slug = 'home-living'),
  '/placeholder.svg?height=600&width=600',
  30,
  true,
  ARRAY['home', 'lighting', 'smart']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'smart-led-desk-lamp');

INSERT INTO products (name, slug, description, price, original_price, category_id, image_url, stock_quantity, is_featured, tags)
SELECT
  'Premium Skincare Set',
  'premium-skincare-set',
  'Complete skincare routine with natural ingredients',
  55.00,
  75.00,
  (SELECT id FROM categories WHERE slug = 'beauty-health'),
  '/placeholder.svg?height=600&width=600',
  25,
  true,
  ARRAY['beauty', 'skincare', 'natural']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'premium-skincare-set');

INSERT INTO products (name, slug, description, price, original_price, category_id, image_url, stock_quantity, tags)
SELECT
  'Luxury Watch',
  'luxury-watch',
  'Elegant timepiece with premium leather strap',
  120.00,
  NULL,
  (SELECT id FROM categories WHERE slug = 'fashion'),
  '/placeholder.svg?height=600&width=600',
  15,
  ARRAY['fashion', 'accessories', 'watches']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'luxury-watch');

INSERT INTO products (name, slug, description, price, category_id, image_url, stock_quantity, tags)
SELECT
  'Educational Building Blocks',
  'educational-building-blocks',
  'Creative building blocks set for kids ages 3+',
  25.00,
  (SELECT id FROM categories WHERE slug = 'kids-toys'),
  '/placeholder.svg?height=600&width=600',
  40,
  ARRAY['kids', 'toys', 'educational']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'educational-building-blocks');

INSERT INTO products (name, slug, description, price, category_id, image_url, stock_quantity, tags)
SELECT
  'Car Phone Holder',
  'car-phone-holder',
  'Universal magnetic phone mount for car dashboard',
  15.00,
  (SELECT id FROM categories WHERE slug = 'car-accessories'),
  '/placeholder.svg?height=600&width=600',
  60,
  ARRAY['car', 'accessories', 'phone']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'car-phone-holder');

INSERT INTO products (name, slug, description, price, original_price, category_id, image_url, stock_quantity, is_featured, tags)
SELECT
  'Yoga Mat & Accessories Kit',
  'yoga-mat-accessories-kit',
  'Non-slip yoga mat with blocks, strap, and carry bag',
  40.00,
  55.00,
  (SELECT id FROM categories WHERE slug = 'health-fitness'),
  '/placeholder.svg?height=600&width=600',
  35,
  true,
  ARRAY['fitness', 'yoga', 'health']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'yoga-mat-accessories-kit');

INSERT INTO products (name, slug, description, price, category_id, image_url, stock_quantity, tags)
SELECT
  'Multi-Tool Kit',
  'multi-tool-kit',
  'Professional 50-piece tool set for home and workshop',
  65.00,
  (SELECT id FROM categories WHERE slug = 'tools-hardware'),
  '/placeholder.svg?height=600&width=600',
  20,
  ARRAY['tools', 'hardware', 'professional']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'multi-tool-kit');

INSERT INTO products (name, slug, description, price, original_price, category_id, image_url, stock_quantity, tags)
SELECT
  'Personalized Gift Box',
  'personalized-gift-box',
  'Customizable gift box with premium items',
  30.00,
  40.00,
  (SELECT id FROM categories WHERE slug = 'gifts'),
  '/placeholder.svg?height=600&width=600',
  45,
  ARRAY['gifts', 'premium', 'personalized']
WHERE NOT EXISTS (SELECT 1 FROM products WHERE slug = 'personalized-gift-box');
