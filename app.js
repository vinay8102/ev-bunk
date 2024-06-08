// Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyAR5ua-0qytOjX2QMI8zqA65foSMqeUtkA",
  authDomain: "ev-recharge-37469.firebaseapp.com",
  projectId: "ev-recharge-37469",
  storageBucket: "ev-recharge-37469.appspot.com",
  messagingSenderId: "760317417899",
  appId: "1:760317417899:web:ad9d9ee2d78ed849f99aee",
  measurementId: "G-7HTY0SVVG1"

  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  const auth = firebase.auth();


// Initialize Google Map
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });

  // Fetch EV Bunks from Firestore and add markers
  db.collection('ev-bunks').get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();
      const marker = new google.maps.Marker({
        position: data.location,
        map: map,
        title: `${data.name} - ${data.availableSlots}/${data.slots} slots available`
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${data.name}</h3><p>${data.address}</p><p>Available Slots: ${data.availableSlots}/${data.slots}</p>`
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }).catch(err => {
    console.error('Error fetching EV Bunks:', err);
  });
}

 // Register User
 document.getElementById('register-button').addEventListener('click', () => {
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const user = userCredential.user;
      return db.collection('users').doc(user.uid).set({
        username: username,
        email: email
      });
    })
    .then(() => {
      alert('User registered successfully!');
    })
    .catch(error => {
      console.error('Error registering user:', error);
      alert(error.message);
    });
});

// Login User
document.getElementById('login-button').addEventListener('click', () => {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  db.collection('users').where('username', '==', username).get()
    .then(snapshot => {
      if (snapshot.empty) {
        throw new Error('No user found with this username.');
      }
      const userData = snapshot.docs[0].data();
      return auth.signInWithEmailAndPassword(userData.email, password);
    })
    .then(userCredential => {
      alert('User logged in successfully!');
      // Hide auth container after login
      document.getElementById('auth-container').style.display = 'none';
      // Initialize map after login
      initMap();
    })
    .catch(error => {
      console.error('Error logging in user:', error);
      alert(error.message);
    });
});


// Track authentication state
auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in
    document.getElementById('auth-container').style.display = 'none';
    initMap();
  } else {
    // No user is signed in
    document.getElementById('auth-container').style.display = 'block';
  }
});

// Add sample EV Bunks to Firestore (run this once)
const sampleBunks = [
  { name: "EV Bunk 1", address: "123 Main St, City", slots: 10, availableSlots: 5, location: { lat: -34.397, lng: 150.644 } },
  { name: "EV Bunk 2", address: "124 Main St, City", slots: 12, availableSlots: 6, location: { lat: -34.407, lng: 150.654 } },
  { name: "EV Bunk 3", address: "125 Main St, City", slots: 8, availableSlots: 2, location: { lat: -34.417, lng: 150.664 } },
  { name: "EV Bunk 4", address: "126 Main St, City", slots: 15, availableSlots: 10, location: { lat: -34.427, lng: 150.674 } },
  { name: "EV Bunk 5", address: "127 Main St, City", slots: 20, availableSlots: 15, location: { lat: -34.437, lng: 150.684 } },
  { name: "EV Bunk 6", address: "128 Main St, City", slots: 25, availableSlots: 18, location: { lat: -34.447, lng: 150.694 } },
  { name: "EV Bunk 7", address: "129 Main St, City", slots: 30, availableSlots: 25, location: { lat: -34.457, lng: 150.704 } },
  { name: "EV Bunk 8", address: "130 Main St, City", slots: 5, availableSlots: 3, location: { lat: -34.467, lng: 150.714 } },
  { name: "EV Bunk 9", address: "131 Main St, City", slots: 10, availableSlots: 8, location: { lat: -34.477, lng: 150.724 } },
  { name: "EV Bunk 10", address: "132 Main St, City", slots: 12, availableSlots: 10, location: { lat: -34.487, lng: 150.734 } },
  { name: "EV Bunk 11", address: "133 Main St, City", slots: 8, availableSlots: 5, location: { lat: -34.497, lng: 150.744 } },
  { name: "EV Bunk 12", address: "134 Main St, City", slots: 15, availableSlots: 12, location: { lat: -34.507, lng: 150.754 } },
  { name: "EV Bunk 13", address: "135 Main St, City", slots: 20, availableSlots: 18, location: { lat: -34.517, lng: 150.764 } },
  { name: "EV Bunk 14", address: "136 Main St, City", slots: 25, availableSlots: 20, location: { lat: -34.527, lng: 150.774 } },
  { name: "EV Bunk 15", address: "137 Main St, City", slots: 30, availableSlots: 28, location: { lat: -34.537, lng: 150.784 } },
  { name: "EV Bunk 16", address: "138 Main St, City", slots: 5, availableSlots: 3, location: { lat: -34.547, lng: 150.794 } },
  { name: "EV Bunk 17", address: "139 Main St, City", slots: 10, availableSlots: 7, location: { lat: -34.557, lng: 150.804 } },
  { name: "EV Bunk 18", address: "140 Main St, City", slots: 12, availableSlots: 9, location: { lat: -34.567, lng: 150.814 } },
  { name: "EV Bunk 19", address: "141 Main St, City", slots: 8, availableSlots: 5, location: { lat: -34.577, lng: 150.824 } },
  { name: "EV Bunk 20", address: "142 Main St, City", slots: 15, availableSlots: 12, location: { lat: -34.587, lng: 150.834 } }
];

sampleBunks.forEach(bunk => {
  db.collection('ev-bunks').add(bunk).then(() => {
    console.log('EV Bunk added:', bunk.name);
  }).catch(err => {
    console.error('Error adding EV Bunk:', err);
  });
});
