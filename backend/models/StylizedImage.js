class StylizedImage {
    constructor(S3_key, username, inputImageKey, styleImageKey) {
        this.S3_key = S3_key;
        this.user = username;
        this.inputImage_S3_key= inputImageKey;
        this.styleImage_S3_key = styleImageKey;
        this.dateCreated = new Date();
    }
}