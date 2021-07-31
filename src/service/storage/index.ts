import { storage } from './../../config/firebase'
import firebase from 'firebase/app'

const imageRef = storage.ref('images')

const metadata = {
  contentType: 'image/*',
}

async function uploadImage(file: File): Promise<string> {
  const uploadTask = imageRef.child(file.name).put(file, metadata)
  return new Promise<string>((resolve, rejects) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
            break
        }
      },
      (error: firebase.storage.FirebaseStorageError) => {
        console.log(error.code)
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break
          case 'storage/canceled':
            // User canceled the upload
            break

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
        rejects(error.code)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log(downloadURL)
          resolve(downloadURL)
        })
      },
    )
  })
}

export { uploadImage }
