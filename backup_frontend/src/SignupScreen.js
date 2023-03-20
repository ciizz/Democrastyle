import React, { Component } from 'react';
import './App.css';
import ScreenContext from './ScreenContext';
import btn_icon_672935 from './images/btn_icon_672935.png';

// UI framework component imports
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import Appbar from 'muicss/lib/react/appbar';

export default class SignupScreen extends Component {

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

  textInputChanged_elFieldName = (event) => {
    this.setState({fieldName: event.target.value});
  }
  
  getValue_elFieldName = () => {
    return this.state.fieldName || '';
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
  
  onClick_elButtonCreate = async () => {
    // Go to screen 'Explore'
    this.context.appActions.goToScreen('explore', this.context.baseScreenId, { transitionId: 'fadeIn' });
  
  }
  
  
  onClick_elIconButton = async () => {
    // Go to screen 'Welcome'
    this.context.appActions.goToScreen('welcome', this.context.baseScreenId, { transitionId: 'fadeIn' });
  
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
    
    const style_elFieldName = {
      display: 'block',
      paddingTop: 0,
      textAlign: 'left',
      pointerEvents: 'auto',
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
    
    const style_elButtonCreate = {
      display: 'block',
      fontSize: 15.0,
      color: '(null)',
      textAlign: 'center',
      cursor: 'pointer',
      pointerEvents: 'auto',
     };
    
    const style_elIconButton = {
      display: 'block',
      textTransform: 'uppercase',
      backgroundImage: 'url('+btn_icon_672935+')',
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
      <div className="AppScreen SignupScreen" style={baseStyle}>
        <div className="background">
          <div className="containerMinHeight elBackground" style={style_elBackground_outer}>
            <div className="appBg" style={style_elBackground} />
          </div>
        </div>
        
        <div className="layoutFlow" style={layoutFlowStyle}>
          <div className="elSpacer">
            <div />
          </div>
          
          <div className="elFieldName">
            <Input className="baseFont" style={style_elFieldName} type="text" placeholder={this.context.locStrings.signup_field_254753} onChange={this.textInputChanged_elFieldName} value={this.getValue_elFieldName()}  />
          </div>
          
          <div className="elFieldEmail">
            <Input className="baseFont" style={style_elFieldEmail} type="email" placeholder={this.context.locStrings.signup_fieldcopy2_892121} onChange={this.textInputChanged_elFieldEmail} value={this.getValue_elFieldEmail()}  />
          </div>
          
          <div className="elFieldPassword">
            <Input className="baseFont" style={style_elFieldPassword} type="password" placeholder={this.context.locStrings.signup_fieldcopy_581116} onChange={this.textInputChanged_elFieldPassword} value={this.getValue_elFieldPassword()}  />
          </div>
          
          <div className="elButtonCreate">
            <Button className="systemFontRegular" style={style_elButtonCreate}  variant="raised" color="accent" onClick={this.onClick_elButtonCreate} >
              {this.context.locStrings.signup_button_919390}
            </Button>
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
              <div>{this.context.locStrings.signup_text2_568215}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}
