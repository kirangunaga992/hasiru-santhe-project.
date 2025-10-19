// This file contains mock data for products to make the UI look complete and impressive.
// In a real application, this data would come from your Firestore database.

// Image URLs from Pexels and Unsplash - royalty-free
const products = [
  {
    id: 1,
    name: 'Fresh Tomatoes',
    price: 45,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 2,
    name: 'Organic Carrots',
    price: 60,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 3,
    name: 'Spinach Bunch',
    price: 20,
    unit: 'bunch',
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 4,
    name: 'Farm Potatoes',
    price: 30,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 5,
    name: 'Crisp Bell Peppers',
    price: 80,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/1668853/pexels-photo-1668853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 6,
    name: 'Cauliflower',
    price: 40,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/162971/cauliflower-white-food-vegetables-162971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 7,
    name: 'Green Beans',
    price: 55,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/4033231/pexels-photo-4033231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 8,
    name: 'Red Onions',
    price: 70,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/5951888/pexels-photo-5951888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 9,
    name: 'Cucumbers',
    price: 35,
    unit: 'kg',
    image: 'https://images.pexels.com/photos/2329440/pexels-photo-2329440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 10,
    name: 'Broccoli',
    price: 120,
    unit: 'piece',
    image: 'https://images.pexels.com/photos/47343/broccoli-vegetable-food-healthy-47343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const services = [
    { name: 'Seeds', image: 'https://images.pexels.com/photos/7420890/pexels-photo-7420890.jpeg' },
    { name: 'Seedlings', image: 'https://images.pexels.com/photos/169523/pexels-photo-169523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { name: 'Machinery', image: 'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Hire Worker', image: 'https://images.pexels.com/photos/5698377/pexels-photo-5698377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Cultivation', image: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { name: 'Crop Solution', image: 'https://images.pexels.com/photos/4207790/pexels-photo-4207790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

export { products, services };
