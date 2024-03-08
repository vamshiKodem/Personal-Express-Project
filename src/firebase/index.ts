import firebase from "firebase-admin";

import serviceAccountKeys from "./serviceAccountKeys.json";

firebase.initializeApp({
  credential: firebase.credential.cert(
    serviceAccountKeys as firebase.ServiceAccount
  ),
});

export default firebase;
