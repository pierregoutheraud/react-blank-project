import React from 'react/addons';
let { TestUtils } = React.addons;

import DmChat from 'DmChat';
import CONFIG from 'config/config.js';

describe('DmChat', function() {

  let chat;

  beforeEach(function(){

    chat = new window.DmChat({
      api_key: 'abcd12345',
      owner: 'httpete',
      name: 'test',
      styles: 'games',
      loginCallback: () => {
        console.log('Login success');
      }
    });

  });

  it('gets all parameters right', function() {
    expect(chat.api_key).toEqual('abcd12345');
    expect(chat.owner).toEqual('httpete');
    expect(chat.name).toEqual('test');
    expect(chat.styles).toEqual('games');
    expect(chat.debug).toEqual(false);

    // expect(chat.placeholder).toEqual();
    // expect(chat.loginCallback).toEqual(false);
  });

  it('creates regex from config', function() {
    expect(CONFIG.CHAT.MEMES_REGEX).not.toBeNull();
    expect(CONFIG.CHAT.EMOJIS_REGEX).not.toBeNull();
  });

  it('initiates room', function() {
    expect(chat.room).toEqual('httpete-test');
  });

  // it('changes skin on demand', function(done) {
    // setTimeout(done, 2000);
    // chat.changeSkin('dark');
    // console.log( document.querySelector('.dmc').className.split(/\s+/) );
    // chat.changeSkin('light');
    // console.log( TestUtils.findRenderedDOMComponentWithClass('dmc') );
  // });

  // it('renders App component', function() {
    // let dmc = React.findDOMNode(this.refs.dmc);
    // console.log(dmc);
    // expect(document.querySelector('.dmc')).not.toBeNull();
    // console.log( TestUtils.findRenderedDOMComponentWithClass('dmc') );
  // });

  /*



  */

});
