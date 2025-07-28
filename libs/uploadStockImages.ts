import storage from "@react-native-firebase/storage";

/**
 * Uploads stock images to Firebase Storage
 * @param stockId - ID of the stock to associate images with
 * @param images - Object containing images to upload keyed by their type/position
 * @param existingImages - Object containing existing image URLs (optional)
 * @returns Object containing download URLs for each uploaded image
 */
export async function uploadStockImages(
  stockId: string,
  images: Record<string, string | undefined>,
  existingImages?: Record<string, string>
): Promise<Record<string, string>> {
  const downloadURLs: Record<string, string> = {};

  // Process each image
  for (const [key, imageUri] of Object.entries(images)) {
    // Skip empty images
    if (!imageUri) continue;

    // Check if image has changed
    const existingUrl = existingImages?.[key];
    const hasChanged = !existingUrl || imageUri !== existingUrl;

    if (hasChanged) {
      // Create a reference to the image in Firebase Storage
      const imageRef = storage().ref().child(`stocks/${stockId}/${key}.jpg`);

      // Upload the image
      await imageRef.putFile(imageUri);

      // Get the download URL for the image
      const downloadURL = await imageRef.getDownloadURL();
      downloadURLs[key] = downloadURL;
    } else {
      // Use existing URL if image hasn't changed
      downloadURLs[key] = existingUrl;
    }
  }

  return downloadURLs;
}
