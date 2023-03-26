import axios from 'axios';

const DEMOCRASTYLE_API_URL = 'http://localhost:8080/';

class APIService {
    static async performStyleTransfer(contentImage, styleImage, contentImageName, styleImageName, user) {
        const formData = new FormData();
        formData.append('images', contentImage);
        formData.append('images', styleImage);
        formData.append('contentImageName', contentImageName);
        formData.append('styleImageName', styleImageName);
        formData.append('user', user);
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          };
        const response = await axios.post(DEMOCRASTYLE_API_URL + 'images/perform_inference', formData, config);
        return response.data;
    }

    static async getUserByUsername(username) {
        const response = await axios.get(DEMOCRASTYLE_API_URL + 'users/' + username);
        return response.data;
    }

    static async getUserProfilePic(username) {
        const response = await axios.get(DEMOCRASTYLE_API_URL + 'images/get_profile_picture', {
                user: "andrewG"
        });
        return response.data;
    }

    static async updateUser(username, email, firstName, lastName, imageUrl) {
        const response = await axios.put(DEMOCRASTYLE_API_URL + 'users/' + username + '/update_user', {
            email: email,
            firstName: firstName,
            lastName: lastName,
            imageUrl: imageUrl
        });
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
}

export default APIService;