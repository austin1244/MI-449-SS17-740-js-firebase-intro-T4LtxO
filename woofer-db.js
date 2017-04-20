/* global firebase, updateWoofRow, deleteWoofRow, addWoofRow */

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDv27HZxRWGUdExUKP71ElgnBAK_0D3MP8',
  authDomain: 'woofer-5b40c.firebaseapp.com',
  databaseURL: 'https://woofer-5b40c.firebaseio.com',
  projectId: 'woofer-5b40c',
  storageBucket: 'woofer-5b40c.appspot.com',
  messagingSenderId: '518178160086'
}

firebase.initializeApp(config)

firebase.auth().signInAnonymously()

// CREATE a new woof in Firebase
function createWoofInDatabase (woof) {
  firebase.database().ref('woofs').push(woof)
}

// READ from Firebase when woofs are added, changed, or removed
// Call addWoofRow, updateWoofRow, and deleteWoofRow to update the page
function readWoofsInDatabase () {
  firebase.database().ref('woofs').on('child_added', function (e) {
    addWoofRow(e.key, e.val())
  })
  firebase.database().ref('woofs')
  .on('child_removed', function (e) {
    deleteWoofRow(e.key)
  })
  firebase.database().ref('woofs')
  .on('child_changed', function (e) {
    updateWoofRow(e.key, e.val())
  })
}

// UPDATE the woof in Firebase
function updateWoofInDatabase (woofKey, woofText) {
  firebase.database().ref('woofs').child(woofKey).child('text').set(woofText)
}

// DELETE the woof from Firebase
function deleteWoofFromDatabase (woofKey) {
  firebase.database().ref('woofs').child(woofKey).remove()
}

// Load all of the data
readWoofsInDatabase()
