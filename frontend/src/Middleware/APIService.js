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
}

export default APIService;