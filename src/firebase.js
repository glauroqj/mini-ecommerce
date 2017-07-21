import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  // Populate your firebase configuration data here.
  	apiKey: "AIzaSyCSOt2xKXdFqRxHwExHp4LWBGbDYVGj9h0",
  	authDomain: "petshop-3ec0d.firebaseapp.com",
  	databaseURL: "https://petshop-3ec0d.firebaseio.com",
  	projectId: "petshop-3ec0d",
  	storageBucket: "petshop-3ec0d.appspot.com",
  	messagingSenderId: "847238548600"
});

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database();