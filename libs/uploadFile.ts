import storage from "@react-native-firebase/storage";

export type UploadFileParams = {
  path: string; // Firebase Storageの保存先パス
  file: { uri: string; name: string; size?: number };
  onProgress?: (progress: number) => void;
};

/**
 * 汎用ファイルアップロード関数
 * @param path Firebase Storageの保存先パス
 * @param file アップロードするファイル情報
 * @param onProgress 進捗コールバック
 * @returns ダウンロードURL
 */
export const uploadFile = async ({
  path,
  file,
  onProgress,
}: UploadFileParams): Promise<string> => {
  const fileRef = storage().ref().child(path);
  const uploadTask = fileRef.putFile(file.uri);

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await fileRef.getDownloadURL();
          resolve(downloadURL);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
};
