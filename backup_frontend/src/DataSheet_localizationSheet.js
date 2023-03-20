// eslint-disable-next-line
import React from 'react';
import DataSheetBase from './DataSheetBase.js';

export default class DataSheet_localizationSheet extends DataSheetBase {

  constructor(id, updateCb) {
    super(id, updateCb);
    this.requestedKeyPath = "";  // this value can be specified in the React Studio data sheet UI
  }

  makeDefaultItems() {
    // eslint-disable-next-line no-unused-vars
    let key = 1;
    // eslint-disable-next-line no-unused-vars
    let item;
    
    item = {};
    this.items.push(item);
    item['key'] = "home_text_120063";
    item['en'] = "Welcome to Democrastyle";
    
    item = {};
    this.items.push(item);
    item['key'] = "home_button_221166";
    item['en'] = "Already have an account? Sign in";
    
    item = {};
    this.items.push(item);
    item['key'] = "home_button_71586";
    item['en'] = "New button";
    
    item = {};
    this.items.push(item);
    item['key'] = "home_button_623627";
    item['en'] = "Generate an Image";
    
    item = {};
    this.items.push(item);
    item['key'] = "screen2_navbar_924123";
    item['en'] = "ImageGen";
    
    item = {};
    this.items.push(item);
    item['key'] = "imagegen_text_514323";
    item['en'] = "Input Image";
    
    item = {};
    this.items.push(item);
    item['key'] = "imagegen_button_316913";
    item['en'] = "Upload";
    
    item = {};
    this.items.push(item);
    item['key'] = "imagegen_text2_773327";
    item['en'] = "Style Image";
    
    item = {};
    this.items.push(item);
    item['key'] = "imagegen_button2_629290";
    item['en'] = "Upload\n";
    
    item = {};
    this.items.push(item);
    item['key'] = "imagegen_button3_575079";
    item['en'] = "Generate";
    
    item = {};
    this.items.push(item);
    item['key'] = "screen3_navbar_333153";
    item['en'] = "ImageGen Options";
    
    item = {};
    this.items.push(item);
    item['key'] = "imagegenoptions_text_995529";
    item['en'] = "Here is the result of the style transfer…";
    
    item = {};
    this.items.push(item);
    item['key'] = "imagegenoptions_button_352282";
    item['en'] = "Save";
    
    item = {};
    this.items.push(item);
    item['key'] = "imagegenoptions_button2_21020";
    item['en'] = "Share";
    
    item = {};
    this.items.push(item);
    item['key'] = "login1_navbar_634770";
    item['en'] = "Login";
    
    item = {};
    this.items.push(item);
    item['key'] = "login_textblock_473175";
    item['en'] = " ";
    
    item = {};
    this.items.push(item);
    item['key'] = "login_textblock2_462369";
    item['en'] = " ";
    
    item = {};
    this.items.push(item);
    item['key'] = "login_textblock3_228053";
    item['en'] = "Email";
    
    item = {};
    this.items.push(item);
    item['key'] = "login_field_929447";
    item['en'] = "Email";
    
    item = {};
    this.items.push(item);
    item['key'] = "login_fieldcopy_811615";
    item['en'] = "Password";
    
    item = {};
    this.items.push(item);
    item['key'] = "login_button_927960";
    item['en'] = "Login";
    
    item = {};
    this.items.push(item);
    item['key'] = "login_text_289917";
    item['en'] = "Create your account";
    
    item = {};
    this.items.push(item);
    item['key'] = "screen6_navbar_287511";
    item['en'] = "Welcome";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_text_250428";
    item['en'] = "New text. Double-click to edit";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_text_948304";
    item['en'] = "Welcome to Democrastyle, a platform where you can create and deign your images for free! Thanks to our powerful Fast Style Transfer algoritgm, you can generate your stylized images just a few seconds…";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_text2_628090";
    item['en'] = "Democrastyle";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_text3_226663";
    item['en'] = "About Us";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_button_24385";
    item['en'] = "Login";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_button2_232063";
    item['en'] = "New button";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_button2_1033821";
    item['en'] = "Join";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_text4_134010";
    item['en'] = "Sign Up";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_textcopy_743640";
    item['en'] = "Login";
    
    item = {};
    this.items.push(item);
    item['key'] = "login2_navbar_594927";
    item['en'] = "Signup";
    
    item = {};
    this.items.push(item);
    item['key'] = "login_iconbutton_285826";
    item['en'] = "Icon button";
    
    item = {};
    this.items.push(item);
    item['key'] = "login_text2_768102";
    item['en'] = "Democrastyle";
    
    item = {};
    this.items.push(item);
    item['key'] = "signup_iconbutton_672935";
    item['en'] = "Icon button";
    
    item = {};
    this.items.push(item);
    item['key'] = "signup_text2_568215";
    item['en'] = "Democrastyle";
    
    item = {};
    this.items.push(item);
    item['key'] = "signup_text_322059";
    item['en'] = "New text. Double-click to edit";
    
    item = {};
    this.items.push(item);
    item['key'] = "signup_field_254753";
    item['en'] = "Name";
    
    item = {};
    this.items.push(item);
    item['key'] = "signup_fieldcopy_581116";
    item['en'] = "Password";
    
    item = {};
    this.items.push(item);
    item['key'] = "signup_fieldcopy2_892121";
    item['en'] = "Email";
    
    item = {};
    this.items.push(item);
    item['key'] = "signup_button_919390";
    item['en'] = "Create account";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_text4_125126";
    item['en'] = "Generate your first image now by creating an account or explore the most popular ones ";
    
    item = {};
    this.items.push(item);
    item['key'] = "welcome_iconbutton_12675";
    item['en'] = "Icon button";
    
    item = {};
    this.items.push(item);
    item['key'] = "screen9_navbar_723190";
    item['en'] = "Explore";
    
    item = {};
    this.items.push(item);
    item['key'] = "explore_text2_802011";
    item['en'] = "Democrastyle";
    
    let storedItems = localStorage.getItem(this.id);
    if (storedItems != null) {
      this.items = JSON.parse(storedItems);
    }
  }

  addItem(item, options) {
    super.addItem(item, options);
    
    localStorage.setItem(this.id, JSON.stringify(this.items));
  }

  removeItem(item, options) {
    super.removeItem(item, options);
    
    localStorage.setItem(this.id, JSON.stringify(this.items));
  }

  replaceItemByRowIndex(idx, newItem, options) {
    super.replaceItemByRowIndex(idx, newItem, options);
    
    localStorage.setItem(this.id, JSON.stringify(this.items));
  }

  getStringsByLanguage = () => {
    let stringsByLang = {};
    for (let row of this.items) {
      const locKey = row.key;
      for (let key in row) {
        if (key === 'key')
          continue;
        let langObj = stringsByLang[key] || {};
        langObj[locKey] = row[key];
        stringsByLang[key] = langObj;
      }
    }
    return stringsByLang;
  }

}
