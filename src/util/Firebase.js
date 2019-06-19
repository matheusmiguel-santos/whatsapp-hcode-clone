const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this._config = {
            apiKey: "AIzaSyAWU9zA0RCm7UWB4p_OANNRQHWkKw6wRoY",
            authDomain: "zipzap-clone.firebaseapp.com",
            databaseURL: "https://zipzap-clone.firebaseio.com",
            projectId: "zipzap-clone",
            storageBucket: "gs://zipzap-clone.appspot.com",
            messagingSenderId: "716436315770",
            appId: "1:716436315770:web:22b03f14040aa022"
        };

        this.init();

    }

    initAuth(){

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
            .then(result =>{

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,
                    token
                });

            }).catch(err=>{

                f(err);

            });

        });

    }

    init(){

        if(!window._initializedFirebase) {

            firebase.initializeApp(this._config);

            window._initializedFirebase = true;
        }

    }

    static db(){

        return firebase.firestore();

    }

    static hd(){

        return firebase.storage();

    }

}