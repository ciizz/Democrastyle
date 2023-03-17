import React, { Component } from 'react';
import LocalizedStrings from 'react-localization';
// eslint-disable-next-line
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// eslint-disable-next-line
import * as util from 'util';
import './App.css';
import ScreenContext from './ScreenContext.js';
import ExploreScreen from './ExploreScreen.js';
import LoginScreen from './LoginScreen.js';
import SignupScreen from './SignupScreen.js';
import WelcomeScreen from './WelcomeScreen.js';
import HomeScreen from './HomeScreen.js';
import ImageGenScreen from './ImageGenScreen.js';
import ImageGenOptionsScreen from './ImageGenOptionsScreen.js';
import DataSheet_localizationSheet from './DataSheet_localizationSheet.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.dataSheets = {};
    this.dataSheets['localizationSheet'] = new DataSheet_localizationSheet('localizationSheet', this.dataSheetDidUpdate);
    this.dataSheetLoaded = {};

    this.dataSlots = {};
    this.dataSlots['ds_activeLang'] = "en";

    this.updateLocalizationFromDataSheet(this.dataSheets['localizationSheet']);

    this.state = {
      screenTransitionForward: true,
    }

  }

  windowDidResize = () => {
    let w = window.innerWidth;
    let formatId;
    if (w < 576) formatId = 'narrow-phone';
    else if (w < 768) formatId = 'wide-phone';
    else if (w < 1024) formatId = 'narrow-tablet';
    else formatId = 'wide-tablet';
    if (formatId !== this.state.screenFormatId) {
      this.setState({screenFormatId: formatId});
    }
  }

  componentDidMount() {
    this.windowDidResize();
    window.addEventListener('resize', this.windowDidResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowDidResize);
  }

  isLoading() {
    return this.state.loading;
  }

  goToScreen = (screenId, baseScreenId, props) => {
    // Implemented with React Router's 'history' object.
    // 'baseScreenId' is set when inside a container such as a tab bar.
    let path = '/'+screenId;
    if (baseScreenId && baseScreenId.length > 0) {
      path = '/'+baseScreenId+path;
      props = {};
    }
    this.props.history.push(path, {...props});
    window.scrollTo(0, 0);
  }

  goBack = () => {
    // Implemented with React Router's 'history' object.
    this.props.history.goBack();
  }

  getDataSheet = (sheetId) => {
    // This method is the default implementation and could be customized by a state management plugin.
    return this.dataSheets[sheetId];
  }

  addToDataSheet = (sheetId, newRow, actionId) => {
    // This method is the default implementation and could be customized by a state management plugin.
    let sheet = this.dataSheets[sheetId];
    if (sheet && newRow) {
      let promise = sheet.addItem(newRow, this['serviceOptions_'+sheetId] || {});
      this.setState({});
      return promise;
    }
  }

  updateInDataSheet = (sheetId, row, actionId) => {
    // This method is the default implementation and could be customized by a state management plugin.
    let sheet = this.dataSheets[sheetId];
    if (sheet && row) {
      let promise = sheet.replaceItemByKey(row.key, row, this['serviceOptions_'+sheetId] || {});
      this.setState({});
      return promise;
    }
  }

  removeFromDataSheet = (sheetId, row) => {
    let sheet = this.dataSheets[sheetId];
    if (sheet && row) {
      let promise = sheet.removeItem(row, this['serviceOptions_'+sheetId] || {});
      this.setState({});
      return promise;
    }
  }

  updateDataSlot = (slotId, value, actionId) => {
    // This method is the default implementation and could be customized by a state management plugin.
    if (value === this.dataSlots[slotId])
      return;

    this.dataSlots[slotId] = value;

    if (slotId === 'ds_activeLang') {
      this.locStrings.setLanguage(value);
    }
    this.setState({});
  }

  dataSheetDidUpdate = (dataSheet) => {
    // This method is the default implementation and could be customized by a state management plugin.
    this.setState({});
  }

  updateLocalizationFromDataSheet = (dataSheet) => {
    const stringsObj = dataSheet.getStringsByLanguage();
    if (stringsObj && Object.keys(stringsObj).length > 0) {
      this.locStrings = new LocalizedStrings(stringsObj);
    } else {
      this.locStrings = new LocalizedStrings({en: {}});
    }
    this.locStrings.setLanguage(this.dataSlots['ds_activeLang']);
  }

  createImageUrlFromProp = (prop) => {
    if (prop instanceof Object) {
      if (prop.type != null && prop.type === 'image' && prop.path != null) {
        return "(null)"+prop.path;
      }
    }
    return prop;
  }

  render() {
    const makeScreen = (screenId, baseProps, atTop, forward, subpathId) => {
      let screenCtxProps = {
        ...baseProps,
        atTopOfScreenStack: atTop,
        transitionForward: forward,
        appActions: this,
        dataSheets: this.dataSheets,
        locStrings: this.locStrings,
        deviceInfo: {
          screenFormatId: this.state.screenFormatId
        },
        'ds_activeLang': this.dataSlots['ds_activeLang'],
      };
      let screen;
      switch (screenId) {
        case 'explore':
          screen = <ExploreScreen {...baseProps} />;
          break;
        case 'login':
          screen = <LoginScreen {...baseProps} />;
          break;
        case 'signup':
          screen = <SignupScreen {...baseProps} />;
          break;
        case 'welcome':
          screen = <WelcomeScreen {...baseProps} />;
          break;
        case 'home':
          screen = <HomeScreen {...baseProps} />;
          break;
        case 'imageGen':
          screen = <ImageGenScreen {...baseProps} />;
          break;
        case 'imageGenOptions':
          screen = <ImageGenOptionsScreen {...baseProps} />;
          break;
        default:
          screen = null;
      }
      if (screen) {
        return <ScreenContext.Provider value={screenCtxProps}>{screen}</ScreenContext.Provider>;
      }
    }

    return (
      <div className="App">
        <Switch>
          <Route path="/" render={(props) => makeScreen('welcome', props.location.state, true, true)} exact />
          <Route path="/explore" render={(props) => {
            return makeScreen('explore', props.location.state, true, true);
          }} />
          <Route path="/login" render={(props) => {
            return makeScreen('login', props.location.state, true, true);
          }} />
          <Route path="/signup" render={(props) => {
            return makeScreen('signup', props.location.state, true, true);
          }} />
          <Route path="/welcome" render={(props) => {
            return makeScreen('welcome', props.location.state, true, true);
          }} />
          <Route path="/home" render={(props) => {
            return makeScreen('home', props.location.state, true, true);
          }} />
          <Route path="/imageGen" render={(props) => {
            return makeScreen('imageGen', props.location.state, true, true);
          }} />
          <Route path="/imageGenOptions" render={(props) => {
            return makeScreen('imageGenOptions', props.location.state, true, true);
          }} />
        </Switch>
      </div>
    );
  }
}
export default withRouter(App)
