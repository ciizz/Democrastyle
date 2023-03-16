class StylizedImage {
    constructor(url, username, inputImageKey, styleImageKey) {
        this.url = url;
        this.user = username;
        this.inputImage_S3_key= inputImageKey;
        this.styleImage_S3_key = styleImageKey;
        this.dateCreated = new Date();
    }
}