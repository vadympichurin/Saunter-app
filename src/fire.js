import firebase from 'firebase';
import 'firebase/database'

let config ={
    apiKey: "AIzaSyB_I5H2I17EAuek1O_MUIjLP462HXRs2Dk",
    authDomain: "saunter-cbc3d.firebaseapp.com",
    databaseURL: "https://saunter-cbc3d.firebaseio.com/",
    projectId: "saunter-cbc3d",
};

let fire = firebase.initializeApp(config);

export default fire;