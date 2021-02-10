import firebase from 'firebase'
//8E+ajqBGt?w-y-y
interface News{
        id: number,
        title: string,
        description?: string,
        url_news: string,
        time: string
}
var firebaseConfig = {
    apiKey: "AIzaSyAAoalT4d0iStydqqAEzXUKEojP8wYQXsw",
    authDomain: "central-sul.firebaseapp.com",
    databaseURL: "https://central-sul.firebaseio.com",
    projectId: "central-sul",
    storageBucket: "central-sul.appspot.com",
    messagingSenderId: "879485991227",
    appId: "1:879485991227:web:dd450c01cd0aa6e053df1e",
    measurementId: "G-ECJBYPZLDK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

  export async function Get(props:string){
    const docRef = db.collection('notes').doc(props);
    return (await docRef.get()).data()
  }

  export async function Saved(props:News) {
    const docRef = db.collection('notes').doc(props.title);
    await docRef.set({
      id: props.id,
      url_news: props.url_news,
      title: props.title,
      time : props.time,
      description : props.description
    }).then(function(docRef) {console.log("succes")});   
}