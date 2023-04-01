const StylizedImage = require('./StylizedImage');
const InputImage = require('./InputImage');

// Test stylized image class
describe('StylizedImage class', () => {
  it('should create a new stylized image with the correct properties', () => {
    const stylizedImage = new StylizedImage('stylized-image-key', 'http://example.com/stylized-image.png', 'johndoe', 'input-image-key', 'style-image-key');

    expect(stylizedImage.S3_key).toBe('stylized-image-key');
    expect(stylizedImage.url).toBe('http://example.com/stylized-image.png');
    expect(stylizedImage.user).toBe('johndoe');
    expect(stylizedImage.inputImage_S3_key).toBe('input-image-key');
    expect(stylizedImage.styleImage_S3_key).toBe('style-image-key');
  });

  it('should throw an error when S3 key is missing', () => {
    expect(() => new StylizedImage(null, 'http://example.com/stylized-image.png', 'johndoe', 'input-image-key', 'style-image-key')).toThrow('S3 key, url, username, input image key, and style image key are required');
  });

  it('should throw an error when url is missing', () => {
    expect(() => new StylizedImage('stylized-image-key', null, 'johndoe', 'input-image-key', 'style-image-key')).toThrow('S3 key, url, username, input image key, and style image key are required');
  });

  it('should throw an error when username is missing', () => {
    expect(() => new StylizedImage('stylized-image-key', 'http://example.com/stylized-image.png', null, 'input-image-key', 'style-image-key')).toThrow('S3 key, url, username, input image key, and style image key are required');
  });

  it('should throw an error when input image key is missing', () => {
    expect(() => new StylizedImage('stylized-image-key', 'http://example.com/stylized-image.png', 'johndoe', null, 'style-image-key')).toThrow('S3 key, url, username, input image key, and style image key are required');
  });

  it('should throw an error when style image key is missing', () => {
    expect(() => new StylizedImage('stylized-image-key', 'http://example.com/stylized-image.png',
      'johndoe', 'input-image-key', null)).toThrow('S3 key, url, username, input image key, and style image key are required');
  });
});

// Test input image class
describe('InputImage class', () => {
  it('should create a new input image with the correct properties', () => {
    const inputImage = new InputImage('input-image-key', 'johndoe');

    expect(inputImage.S3_key).toBe('input-image-key');
    expect(inputImage.user).toBe('johndoe');
  });

  it('should throw an error when S3 key is missing', () => {
    expect(() => new InputImage(null, 'johndoe')).toThrow('S3 key and username are required');
  });

  it('should throw an error when username is missing', () => {
    expect(() => new InputImage('input-image-key', null)).toThrow('S3 key and username are required');
  });
});
