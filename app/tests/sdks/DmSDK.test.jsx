import React from 'react/addons';
let { TestUtils } = React.addons;
import DmSDKActions from 'actions/DmSDKActions';

describe('DmSDK', function() {

  let dmSDKInjector, dmSDK, options;

  beforeEach(function() {

    spyOn(DmSDKActions, 'initialized');
    dmSDKInjector = require('inject!sdks/DmSDK.js');
    dmSDK = dmSDKInjector({
      'actions/DmSDKActions';: DmSDKActions,
    });

    window.DM = null;
    options = {
      anonymous: false,
      owner: 'httpete',
      api_key: 'a2bb1246cc2e7ce91764'
    };
    dmSDK = dmSDK.init(options);

  });

  it('imports Dailymotion JS SDK script', function() {
    let src = document.location.protocol + '//api.dmcdn.net/all.js';
    let scriptTag = document.querySelectorAll('[src="'+ src +'"]');
    expect(scriptTag).not.toBeNull();
  });

  // Async wait for script tag
  // xit('is initialized in less than 4 seconds', function(done) {
  //   setTimeout(function(){ // We wait 4 seconds to load script tag
  //     expect(window.DM).not.toBeNull();
  //     expect(DmSDKActions.initialized).toHaveBeenCalledWith(options);
  //     done();
  //   }, 4000);
  // }, 5000);

});
