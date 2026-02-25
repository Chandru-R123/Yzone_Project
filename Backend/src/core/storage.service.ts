class StorageService {

  static async upload(file: Express.Multer.File) {
    // Later integrate Azure Blob here
    console.log("Uploading file:", file.originalname);

    return {
      url: `https://storage.example.com/${file.originalname}`
    };
  }

  static async delete(fileUrl: string) {
    console.log("Deleting file:", fileUrl);
    return { success: true };
  }
}

export default StorageService;