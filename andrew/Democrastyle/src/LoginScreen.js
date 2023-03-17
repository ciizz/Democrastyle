import React, { Component } from 'react';
import './App.css';
import ScreenContext from './ScreenContext';
import btn_icon_285826 from './images/btn_icon_285826.png';

// UI framework component imports
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Appbar from 'muicss/lib/react/appbar';

export default class LoginScreen extends Component {

  static contextType = ScreenContext;


  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  textInputChanged_elFieldEmail = (event) => {
    this.setState({fieldEmail: event.target.value});
  }
  
  getValue_elFieldEmail = () => {
    return this.state.fieldEmail || '';
  }
  
  textInputChanged_elFieldPassword = (event) => {
    this.setState({fieldPassword: event.target.value});
  }
  
  getValue_elFieldPassword = () => {
    return this.state.fieldPassword || '';
  }
  
  onClick_elButton = async () => {
    // 'Unlock gate' action.
    this.sendLogin();
  
  }
  
  
  onClick_elText = async () => {
    // Go to screen 'Signup'
    this.context.appActions.goToScreen('signup', this.context.baseScreenId, { transitionId: 'fadeIn' });
  
  }
  
  
  onClick_elIconButton = async () => {
    // Go to screen 'Welcome'
    this.context.appActions.goToScreen('welcome', this.context.baseScreenId, { transitionId: 'fadeIn' });
  
  }
  
  
  sendLogin = () => {
    // This implements the 'simple password' unlock from React Studio.
    // For prototyping only -- you don't want to use this in production code because the password is readable here!
    // To implement a real login, use a web service plugin instead of the 'simple password' setting.
    const pass = this.state.fieldPassword || '';
    if (pass === "") {
       this.finishLogin();
    } else {
      const err = 'Incorrect password.';
      sessionStorage.setItem('loginStatus_login', 'failed');
      this.context.appActions.goToScreen('login', this.context.baseScreenId, { errorText: ''+err });
  
    }
  }
  
  finishLogin = () => {
      sessionStorage.setItem('loginStatus_login', 'active');
      this.context.appActions.goToScreen('explore', this.context.baseScreenId);
  }
  
  render() {
    let layoutFlowStyle = {};
    let baseStyle = {};
    if (this.context.transitionId && this.context.transitionId.length > 0 && this.context.atTopOfScreenStack && this.context.transitionForward) {
      baseStyle.animation = '0.25s ease-in-out '+this.context.transitionId;
    }
    if ( !this.context.atTopOfScreenStack) {
      layoutFlowStyle.height = '100vh';
      layoutFlowStyle.overflow = 'hidden';
    }
    
    const style_elBackground = {
      width: '100%',
      height: '100%',
     };
    const style_elBackground_outer = {
      boxSizing: 'border-box',
      backgroundColor: '#feffff',
     };
    
    const style_elFieldEmail = {
      display: 'block',
      paddingTop: 0,
      textAlign: 'left',
      pointerEvents: 'auto',
     };
    
    const style_elFieldPassword = {
      display: 'block',
      paddingTop: 0,
      textAlign: 'left',
      pointerEvents: 'auto',
     };
    
    const style_elButton = {
      display: 'block',
      color: '(null)',
      textAlign: 'center',
      cursor: 'pointer',
      pointerEvents: 'auto',
     };
    const style_elText = {
      color: 'rgba(213, 213, 213, 0.5000)',
      textAlign: 'center',
      cursor: 'pointer',
      pointerEvents: 'auto',
     };
    
    const style_elIconButton = {
      display: 'block',
      textTransform: 'uppercase',
      backgroundImage: 'url('+btn_icon_285826+')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '76.760%',
      backgroundPosition: '50% 0%',
      color: '(null)',
      textAlign: 'left',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      pointerEvents: 'auto',
     };
    const style_elText2 = {
      fontSize: 16.0,
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
      textTransform: 'uppercase',
     };
    
    return (
      <div className="AppScreen LoginScreen" style={baseStyle}>
        <div className="background">
          <div className="containerMinHeight elBackground" style={style_elBackground_outer}>
            <div className="appBg" style={style_elBackground} />
          </div>
        </div>
        
        <div className="layoutFlow" style={layoutFlowStyle}>
          <div className="elSpacer">
            <div />
          </div>
          
          <div className="elFieldEmail">
            <Input className="baseFont" style={style_elFieldEmail} type="email" placeholder={this.context.locStrings.login_field_929447} onChange={this.textInputChanged_elFieldEmail} value={this.getValue_elFieldEmail()}  />
          </div>
          
          <div className="elFieldPassword">
            <Input className="baseFont" style={style_elFieldPassword} type="password" placeholder={this.context.locStrings.login_fieldcopy_811615} onChange={this.textInputChanged_elFieldPassword} value={this.getValue_elFieldPassword()}  />
          </div>
          
          <div className="elButton">
            <Button className="actionFont" style={style_elButton}  variant="raised" color="primary" onClick={this.onClick_elButton} >
              {this.context.locStrings.login_button_927960}
            </Button>
          </div>
          
          <div className="elText">
            <div className="baseFont" style={style_elText} onClick={this.onClick_elText} >
              <div>{this.context.locStrings.login_text_289917}</div>
            </div>
          </div>
        </div>
        <div className="navBarContainer">
         <Appbar className="navBar">
         </Appbar>
        </div>
        
        <div className="screenFgContainer">
          <div className="foreground">
            <button className="actionFont elIconButton" style={style_elIconButton} onClick={this.onClick_elIconButton}  />
            <div className="font-georgiaBoldItalic  elText2" style={style_elText2}>
              <div>{this.context.locStrings.login_text2_768102}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}
