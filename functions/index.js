const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

// Initialize the Firebase Admin SDK
initializeApp();

/**
 * An HTTP function to create a new user document in Firestore.
 * Example: .../createUser?uid=testuser123&phone=9876543210
 */
exports.createUser = onRequest(async (req, res) => {
  // Get the user details from the request URL (e.g., ?uid=...&phone=...)
  const uid = req.query.uid;
  const phone = req.query.phone;

  // Log the information for debugging purposes in the Firebase console
  logger.info(`Attempting to create user with UID: ${uid} and Phone: ${phone}`);

  // Check if required data is present
  if (!uid || !phone) {
    logger.error("Missing uid or phone number in request.");
    return res.status(400).send("Please provide both uid and phone number.");
  }

  // Add the new user data to the 'users' collection in Firestore
  await getFirestore()
    .collection("users")
    .doc(uid)
    .set({
      phone: phone,
      createdAt: new Date().toISOString(),
    });

  // Send a success response back to the caller
  res.status(200).send(`Successfully created user with UID: ${uid}`);
});

/**
 * An HTTP function to create a new product document in Firestore.
 * Example: .../createProduct?name=Tomato&price=25&quantity=10kg&farmerId=testuser123
 */
exports.createProduct = onRequest(async (req, res) => {
  // Get the product details from the request URL
  const name = req.query.name;
  const price = req.query.price;
  const quantity = req.query.quantity;
  const farmerId = req.query.farmerId; // ID of the farmer listing the product

  // Log the information for debugging
  logger.info(`Creating product: ${name} for farmer: ${farmerId}`);

  // Check if required data is present
  if (!name || !price || !quantity || !farmerId) {
    logger.error("Missing product details in request.");
    return res.status(400).send("Please provide name, price, quantity, and farmerId.");
  }

  // Add the new product data to the 'products' collection in Firestore
  const writeResult = await getFirestore()
    .collection("products")
    .add({
      name: name,
      price: parseFloat(price), // Convert price to a number
      quantity: quantity,
      farmerId: farmerId,
      listedAt: new Date().toISOString(),
    });

  // Send a success response back with the new product's ID
  res.status(200).send(`Successfully created product with ID: ${writeResult.id}`);
});

/**
 * An HTTP function that parses a text string to create a product.
 * This simulates the output from a Speech-to-Text API.
 * Expects a POST request with JSON: { "text": "ಟೊಮೆಟೊ 10 ಕೆಜಿ 25 ರೂಪಾಯಿ", "farmerId": "someUser" }
 */
exports.createProductFromVoiceText = onRequest(async (req, res) => {
  // Get the transcribed text and farmerId from the request body
  const { text, farmerId } = req.body;

  logger.info(`Received text to parse: "${text}" for farmer: ${farmerId}`);

  if (!text || !farmerId) {
    return res.status(400).send("Request must include 'text' and 'farmerId'.");
  }

  // --- Simple Parsing Logic ---
  // This is the "hackathon trick". We assume a simple structure.
  // Example: "ಟೊಮೆಟೊ 10 ಕೆಜಿ 25 ರೂಪಾಯಿ" (Tomato 10 kg 25 rupees)
  const words = text.split(" "); // ["ಟೊಮೆಟೊ", "10", "ಕೆಜಿ", "25", "ರೂಪಾಯಿ"]

  const productName = words[0];
  const productQuantity = `${words[1]} ${words[2]}`; // "10 ಕೆಜಿ"
  const productPrice = parseFloat(words[3]); // 25

  if (!productName || !productQuantity || isNaN(productPrice)) {
    logger.error("Could not parse the text string.", {text});
    return res.status(400).send("Could not understand the product details from the text.");
  }
  // --- End of Parsing Logic ---

  // Add the parsed product data to the 'products' collection
  const writeResult = await getFirestore()
    .collection("products")
    .add({
      name: productName,
      price: productPrice,
      quantity: productQuantity,
      farmerId: farmerId,
      source: "voice", // Add a field to know it came from a voice command
      listedAt: new Date().toISOString(),
    });

  res.status(200).send({
    message: "Successfully created product from voice text!",
    productId: writeResult.id,
    parsedData: { productName, productQuantity, productPrice },
  });
});