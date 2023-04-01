import axios from 'axios';

const DEMOCRASTYLE_API_URL = 'http://localhost:8080/';

class APIService {

    static async performStyleTransfer(contentImage, styleImage, contentImageName, styleImageName, user, styleImageSize, sampleMode) {
        const formData = new FormData();
        formData.append('images', contentImage);
        formData.append('images', styleImage);
        formData.append('contentImageName', contentImageName);
        formData.append('styleImageName', styleImageName);
        formData.append('user', user);
        formData.append('styleImageSize', styleImageSize);
        formData.append('sampleMode', sampleMode);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const response = await axios.post(DEMOCRASTYLE_API_URL + 'images/perform_inference', formData, config);
        return response.data;
    }

    static async getUserProfilePic(username) {
        const response = await axios.get(DEMOCRASTYLE_API_URL + 'users/' + username + '/get_profile_picture');
        return response.data.profilePicture;
    }

    static async uploadUserProfilePic(username, file) {
        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const response = await axios.post(DEMOCRASTYLE_API_URL + 'users/' + username + '/upload_profile_picture', formData, config);
        return response.data.profilePicture;
    }


    static async isEmailTaken(email) {
        const response = await axios.get(DEMOCRASTYLE_API_URL + 'users/is_email_taken/' + email);
        return response.data;
    }

    static async updateEmail(uid, email) {
        const response = await axios.put(DEMOCRASTYLE_API_URL + 'users/' + uid + '/update_user_email', { email: email });
        return response.data;
    }

    static async isDisplayNameTaken(displayName) {
        const response = await axios.get(DEMOCRASTYLE_API_URL + 'users/is_displayname_taken/' + displayName);
        return response.data;
    }

    static async getStylizedImagesByUser(username) {
        const response = await axios.get(DEMOCRASTYLE_API_URL + 'users/' + username + '/stylized_images');
        return response.data;
    }

    static async getAllStylizedImages() {
        const response = await axios.get(DEMOCRASTYLE_API_URL + 'images/stylized_images');
        return response.data;
    }

    static async getPremadeStyles() {
        const response = await axios.get(DEMOCRASTYLE_API_URL + 'images/premade_styles');
        return response.data;
    }

    static async getImageData(imageUrl) {
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        let buffer = await new Response(response.data).arrayBuffer();
        return new Uint8Array(buffer);
    }

    static async getRequestCounts() {
        const response = await axios.get(DEMOCRASTYLE_API_URL + 'images/request_counts');
        return response.data;
    }
}

export default APIService;