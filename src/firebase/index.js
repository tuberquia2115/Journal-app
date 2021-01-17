import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseConfig } from './config';



class Firebase {
    constructor() {
        let app = null;
        if (!firebase.apps.length) {
            app = firebase.initializeApp(firebaseConfig);
        }
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();
    }

}

const fb = new Firebase()

export {
    fb,
    firebase
};