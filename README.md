# Jupiter's conclusion
Usage of Vue makes developing beautiful and fun with the material icons. You will learn how to use Vue, Vuetify, Webpack, Firebase, Node, Vuex on this project.

# super-rentals-vue
> Ported implementation of SuperRentals (see https://github.com/jupiterhub/super-rentals)

## Demo
https://superrentals-1505459904619.firebaseapp.com/

## Build Setup
~~~~
# update config/prod.env.js
NODE_ENV: '"production"',
/*
  Go to https://console.firebase.google.com
  var config = {
    apiKey: "<API_KEY>",  // in Overview Page
    authDomain: "<PROJECT_ID>.firebaseapp.com", // in Overview Page
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",  // in Database Page
    storageBucket: "<BUCKET>.appspot.com" // In Storage Page
  };
*/
// add these lines
API_KEY: '"FILL_ME"',
AUTH_DOMAIN: '"FILL_ME"',
DATABASE_URL: '"FILL_ME"',
PROJECT_ID: '"FILL_ME"',
STORAGE_BUCKET: '"FILL_ME"'
~~~~

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# To deploy to firebase
```
firebase init    # (use /dist directory instead of /public)
firebase deploy
```


For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
