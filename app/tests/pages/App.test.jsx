import React from 'react/addons';
let { TestUtils } = React.addons;

import DmChat from 'DmChat';
import dmSDK from 'sdks/DmSDK.js';
import store from 'store';
import CONFIG from 'config/config.js';

import App from 'pages/App';

/*
  App.jsx actions in order :
    - get user color from local storage OR generate a random color
    - get skin and mentionSound from local storage
    - create user and owner state object
    - render the pacman loading
    - fetch operators (through TitiActions and OperatorsStore)
    - when operators fetched : save operators to state and get current user mode ('O', 'o', 'u')
    - when auth finished : subscribe to messages of room
    - when avatar fetch : set it to owner
    - render Header, Users, Chat, UserPopover
*/

describe('App getInitialState', function() {

  let room = "httpete-test",
      ownerUsername = "httpete",
      forceLoading = false,
      pacman = true,
      styles = "games";

  beforeEach(() => {
    window.localStorage.clear(); // clear all localStorage data
    React.unmountComponentAtNode(document.body);
  });

  it('gets user color from local storage if it exists', () => {

    let color = 'f67066';
    store.set('chat_user_color', color);

    let app = React.render(
      <App
        room={room}
        ownerUsername={ownerUsername}
        forceLoading={forceLoading}
        pacman={pacman}
        styles={styles}
      />
    , document.body);

    expect(app.state.user.color).toEqual(color);

  });

  it('generates new color if not present in local storage', () => {

    store.set('chat_user_color', '');

    let app = React.render(
      <App
        room={room}
        ownerUsername={ownerUsername}
        forceLoading={forceLoading}
        pacman={pacman}
        styles={styles}
      />
    , document.body);

    // New generated color is in CONFIG.CHAT.COLORS
    expect( CONFIG.CHAT.COLORS.indexOf(app.state.user.color) !== -1 ).toBe(true);

  });

  it('gets chat skin and mention sound from local storage if it exists', () => {

    let skin = 'dark', mentionSound = true;
    store.set('chat_skin', skin);
    store.set('chat_mention_sound', mentionSound);

    let app = React.render(
      <App
        room={room}
        ownerUsername={ownerUsername}
        forceLoading={forceLoading}
        pacman={pacman}
        styles={styles}
      />
    , document.body);

    expect(app.state.skin).toEqual(skin);
    expect(app.state.mentionSound).toEqual(mentionSound);

  });

});

describe('App', function() {

  let app,
      room = "httpete-test",
      ownerUsername = "httpete",
      forceLoading = false,
      pacman = true,
      styles = "games",
      operators = ['httpete', 'someguy'];

  beforeEach(() => {

    React.unmountComponentAtNode(document.body);
    this.app = TestUtils.renderIntoDocument(
    // React.render(
      <App
        room={room}
        ownerUsername={ownerUsername}
        forceLoading={forceLoading}
        pacman={pacman}
        styles={styles}
      />
    , document.body);

    let operatorsEvent = {
      items: ['operator1', 'operator2']
    };
    this.app.onOperators(operatorsEvent);



  });

  it('sets operators', () => {
    expect(this.app.state.operators).toEqual(operators);
  });

  it('sets right modes', () => {

    let user,
        authEvent

    // User
    user = { user_id: 42, username: 'test' };
    authEvent = { user_id: user.user_id, user_name: user.username, authenticated: true };
    this.app.onAuth(authEvent);
    expect(this.app.state.user.M).toEqual('u');

    // Operator
    user = { user_id: 42, username: 'operator1' };
    authEvent = { user_id: user.user_id, user_name: user.username, authenticated: true };
    this.app.onAuth(authEvent);
    expect(this.app.state.user.M).toEqual('o');

    // Owner
    user = { user_id: 42, username: 'httpete' };
    authEvent = { user_id: user.user_id, user_name: user.username, authenticated: true };
    this.app.onAuth(authEvent);
    expect(this.app.state.user.M).toEqual('O');

  });

});

describe('App', function() {

  let app;

  beforeEach(function(){

    let room = "httpete-test",
        ownerUsername = "httpete",
        forceLoading = false,
        pacman = true,
        styles = "games";

    React.unmountComponentAtNode(document.body);
    app = React.render(
      <App
        room={room}
        ownerUsername={ownerUsername}
        forceLoading={false}
        pacman={true}
        styles={styles}
      />
    , document.body);

  });





});
