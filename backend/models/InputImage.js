// includes content AND style images
class InputImage {
    constructor(S3_key, username) {
        if(!S3_key || !username) {
            throw new Error('S3 key and username are required');
        }
        this.S3_key = S3_key;
        this.user = username;
        this.dateCreated = new Date();
    }
}

module.exports = InputImage;