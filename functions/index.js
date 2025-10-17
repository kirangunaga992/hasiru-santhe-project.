const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

// Initialize the Firebase Admin SDK
initializeApp();

/**
 * An HTTP function to create a new user document in Firestore.
 * To test, you would call this function's URL with query parameters.
 * Example: .../createUser?uid=123&phone=9988776655
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