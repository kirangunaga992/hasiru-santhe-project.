const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");

initializeApp();

// This function does NOT need a security check, as it is part of the registration process.
exports.createUser = onCall(async (request) => {
  const { uid, email, role, name, username, mobile } = request.data;
  logger.info(`Creating user in Firestore: ${uid}`);
  await getFirestore().collection("users").doc(uid).set({
    email, role, name, username, mobile,
    createdAt: new Date().toISOString(),
  });
  return { message: `Success! User document for ${uid} created.` };
});

// This function allows anyone to see products, so it does NOT need a security check.
exports.getProducts = onCall(async () => {
  const productsSnapshot = await getFirestore().collection("products").get();
  const products = [];
  productsSnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return { products };
});

// --- SECURED FUNCTIONS BELOW ---

exports.createProduct = onCall(async (request) => {
  // SECURITY CHECK: Is a user logged in?
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to list a product.');
  }

  // If the check passes, we can safely get the farmer's ID from the logged-in user.
  const farmerId = request.auth.uid;
  const { name, price, quantity } = request.data;

  if (!name || !price || !quantity) {
    throw new HttpsError('invalid-argument', 'Please provide name, price, and quantity.');
  }

  const writeResult = await getFirestore().collection("products").add({
    name,
    price: parseFloat(price),
    quantity,
    farmerId, // Use the secure ID
    listedAt: new Date().toISOString(),
  });

  return { message: `Successfully created product with ID: ${writeResult.id}` };
});


exports.createProductFromVoiceText = onCall(async (request) => {
  // SECURITY CHECK: Is a user logged in?
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'You must be logged in to list a product.');
  }

  // If the check passes, get the secure user ID.
  const farmerId = request.auth.uid;
  const { text } = request.data;

  if (!text) {
    throw new HttpsError('invalid-argument', 'Request must include text.');
  }

  logger.info(`Parsing text: "${text}" for farmer: ${farmerId}`);
  const words = text.split(" ");
  const productName = words[0];
  const productQuantity = `${words[1]} ${words[2]}`;
  const productPrice = parseFloat(words[3]);

  if (!productName || !productQuantity || isNaN(productPrice)) {
    throw new HttpsError('invalid-argument', 'Could not understand the product details from the text.');
  }

  const writeResult = await getFirestore().collection("products").add({
    name: productName,
    price: productPrice,
    quantity: productQuantity,
    farmerId: farmerId, // Use the secure ID
    source: "voice",
    listedAt: new Date().toISOString(),
  });

  return {
    message: "Successfully created product from voice text!",
    productId: writeResult.id,
  };
});

