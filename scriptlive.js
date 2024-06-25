  // Initialize Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDnS3zS37uu-oac7-iw0TMFhMAyfywWHYk",
    authDomain: "myiot-a57f5.firebaseapp.com",
    databaseURL: "https://myiot-a57f5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "myiot-a57f5",
    storageBucket: "myiot-a57f5.appspot.com",
    messagingSenderId: "542244698430",
    appId: "1:542244698430:web:d6bac550b8c0d1722e946f",
    measurementId: "G-GBH4J6ZRC1"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Function to load the QR code dynamically
  async function loadQRCode() {
    try {
      const qrImage = document.getElementById('qrImage');
      const storageRef = ref(storage, 'QR/QR.jpeg');
      const qrUrl = await getDownloadURL(storageRef);
      qrImage.src = qrUrl;
    } catch (error) {
      console.error('Error loading QR code:', error);
    }
  }

  // Load QR code when the page is loaded
  document.addEventListener('DOMContentLoaded', function() {
    loadQRCode();
  });

  document.querySelector('form[name="submit-to-google-sheet"]').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Show submitting spinner
    document.getElementById('submittingSpinner').style.display = 'block';

    try {
      const paymentFileInput = document.querySelector('input[name="paymentScreenshot"]');
      const photoFileInput = document.querySelector('input[name="passportPhoto"]');
      const paymentFile = paymentFileInput.files[0];
      const photoFile = photoFileInput.files[0];
      let paymentFileURL = '';
      let photoFileURL = '';

      if (paymentFile) {
        const paymentStorageRef = ref(storage, `Payments/${paymentFile.name}`);
        await uploadBytes(paymentStorageRef, paymentFile);
        paymentFileURL = await getDownloadURL(paymentStorageRef);
      }

      if (photoFile) {
        const photoStorageRef = ref(storage, `Photos/${photoFile.name}`);
        await uploadBytes(photoStorageRef, photoFile);
        photoFileURL = await getDownloadURL(photoStorageRef);
      }

      const currentDate = new Date().toISOString();

      await setDoc(doc(db, 'Registrations', e.target.fullname.value), {
        fullname: e.target.fullname.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        module: e.target.module.value,
        year: e.target.year.value,
        branch: e.target.branch.value,
        experience: e.target.experience.value,
        paymentFileURL: paymentFileURL,
        photoFileURL: photoFileURL,
        date: currentDate
      });

      // Hide submitting spinner
      document.getElementById('submittingSpinner').style.display = 'none';

      // Show success modal
      document.getElementById('modal').classList.add('is-active');
      e.target.reset();
    } catch (error) {
      console.error("Error uploading file or writing document: ", error);
      // Hide submitting spinner
      document.getElementById('submittingSpinner').style.display = 'none';
      // Handle error (e.g., show error message)
    }
  });

  function closeModal() {
    document.getElementById('modal').classList.remove('is-active');
  }

  // Update the file input label with the selected file name
  document.querySelectorAll('.file-input').forEach(input => {
    input.addEventListener('change', function() {
      const fileName = this.files[0].name;
      this.closest('.file').querySelector('.file-name').textContent = fileName;
    });
  });

