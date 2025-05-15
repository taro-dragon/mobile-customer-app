import storage from "@react-native-firebase/storage";

/**
 * Uploads stock images to Firebase Storage
 * @param stockId - ID of the stock to associate images with
 * @param storeId - ID of the store the stock belongs to
 * @param images - Object containing images to upload keyed by their type/position
 * @returns Object containing download URLs for each uploaded image
 */
export async function uploadStockImages(
  stockId: string,
  storeId: string,
  images: Record<string, string | undefined>
): Promise<Record<string, string>> {
  const downloadURLs: Record<string, string> = {};

  // Process each image
  for (const [key, imageUri] of Object.entries(images)) {
    // Skip empty images
    if (!imageUri) continue;

    // Create a reference to the image in Firebase Storage
    const imageRef = storage().ref().child(`stocks/${stockId}/${key}.jpg`);

    // Upload the image
    await imageRef.putFile(imageUri);

    // Get the download URL for the image
    const downloadURL = await imageRef.getDownloadURL();
    downloadURLs[key] = downloadURL;
  }

  return downloadURLs;
}
