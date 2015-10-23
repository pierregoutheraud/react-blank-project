let DM = {

  init: function() {
    console.log('DM initiated');
  },

  api: function(url, data, callback) {
    if (url.indexOf('/user/') !== -1) {
      let res = {
        "avatar_120_url":"http:\/\/s2.dmcdn.net\/I8m8p\/120x120-429.jpg"
      };
      callback(res);
    } else if (url === '/me') {
      let res = {
        "id":"x1fd03g",
        "username":"httpete"
      };
      callback(res);
    }
  },

  getLoginStatus: function(callback) {
    let response = {
      session: {
        uid: '12345'
      }
    };
    callback(response);
  }

}

export default DM;
