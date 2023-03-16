class StylizedImage {
    constructor(S3_key, url, username, inputImageKey, styleImageKey) {
        this.S3_key = S3_key;
        this.url = url;
        this.user = username;
        this.inputImage_S3_key= inputImageKey;
        this.styleImage_S3_key = styleImageKey;
        this.dateCreated = new Date();
    }
}

module.exports = StylizedImage;