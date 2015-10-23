# Dailymotion Chat javascript plugin

### Import via CDN

Grab one of these 2 css files depending on which theme you want :
```html
<link rel="stylesheet" href="//live-chat.dmcdn.net/css/dailymotion-live-chat-live.css"/>
<link rel="stylesheet" href="//live-chat.dmcdn.net/css/dailymotion-live-chat-games.css"/>
```

Grab javascript code and import it in your html file:
```html
<script src="//live-chat.dmcdn.net/js/dailymotion-live-chat.js"></script>
```

### Usage

Instanciate chat plugin:
```javascript
var c = new window.DmChat(options);
```

Here is an overview of defaults values for options:
```javascript
var c = new window.DmChat({
  owner: null,                      // Username of chat owner
  name: null,                       // Name of your room
  placeholder: document.body,       // Default placeholder of chat (DOM element)
  styles: 'live',                   // Default style of chat
  api_key: null,                    // Dailymotion API key
  onLogin: null,                    // Login callback function
  access_token: null,               // DM access_token (to prevent popup login)
  debug: false                      // Enable or disable console.log with debug
});
```

Available function:

```javascript
c.changeSkin(skin);
```

skin parameter should be equal to 'light' or 'dark'

### Commands

Mute user
```
/mute username
/mute @username
```

Unmute
```
/unmute username
/unmute @username
```

Ban
```
/ban username
/ban @username
```

Unban
```
/unban username
/unban @username
```

Reply to last mention
```
/r
```

# Dailymotion Chat React component

### Install

```
npm install dailymotion-live-chat --save
```

### Usage

See example, in example/ folder.

```javascript
let React = require('react');
let DmChat = require ('dailymotion-live-chat');

React.render(
  <DmChat
    name="x2ns1iw"
    ownerUsername="httpete"
    styles="games"
  />
, document.querySelector('.chat-placeholder'));
```

# Development

### Install
Install all dependencies...
```
$ npm install
```

...and rename sample.config.js to config.js
```
cp app/scripts/config/sample.config.js app/scripts/config/config.js
```


### Run development server

```
$ gulp dev
```

Gulp will start a webpack dev server with hot-reload at port 9099.<br />
You can define a port with `$ gulp --port 3333`.

An online version of grominet backend is available at 'http://dmchat.dailymotion.com:80
You can still build grominet locally (live-chat backend https://github.com/dailymotion/grosminet), and specify the right url in config.js (GROMINET_ENDPOINT)

## Build

Builds a minified version of the application in the dist folder (embed version is available at dist/embed)
```
$ gulp build --t prod
```

Build react component in build folder.
```
$ gulp build-react-component
```


## Testing

```
$ npm test
```

We use karma to test our application. The tests are in \__tests__ folders.
