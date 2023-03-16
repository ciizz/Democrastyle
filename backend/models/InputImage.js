// includes content AND style images
class InputImage {
    constructor(S3_key, username) {
        this.S3_key = S3_key;
        this.user = username;
        this.dateCreated = new Date();
    }
}