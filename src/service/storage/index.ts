import { UploadFile } from 'antd/lib/upload/interface'
import { firebaseApp, imagesRef, storageRef, Timestamp } from './../../config/firebase'
import firebase from 'firebase/app'

async function uploadImage(file: File): Promise<UploadFile<any>> {
  const timeStamp: firebase.firestore.Timestamp = firebase.firestore.Timestamp.fromDate(new Date())
  const metadata = {
    contentType: file.type,
  }
  return new Promise<UploadFile<any>>((resolve, rejects) => {
    try {
      const uploadTask = imagesRef.child(timeStamp + file.name).put(file, metadata)
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(`uploading... ${progress}%`)
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
          // console.log(error.code)
          // switch (error.code) {
          //   case 'storage/unauthorized':
          //     // User doesn't have permission to access the object
          //     break
          //   case 'storage/canceled':
          //     // User canceled the upload
          //     break

          //   // ...

          //   case 'storage/unknown':
          //     // Unknown error occurred, inspect error.serverResponse
          //     break
          // }
          throw error
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve({
              uid: file.name + timeStamp,
              name: file.name,
              status: 'done',
              url: downloadURL,
            })
          })
        },
      )
    } catch {
      rejects({
        uid: file.name + timeStamp,
        name: file.name,
        status: 'error',
      })
    }
  })
}

const getFilePath = (imageUrl: string) => {
  const newUrl = imageUrl.replace(
    'https://firebasestorage.googleapis.com/v0/b/teletubby-v2.appspot.com/o/',
    '',
  )
  const path = newUrl.split('?')
  return decodeURIComponent(path[0])
}

const deleteImages = (imageUrl: string) => {
  const desertRef = storageRef.child(getFilePath(imageUrl))
  // Delete the file
  desertRef
    .delete()
    .then(() => {
      // File deleted successfully
    })
    .catch(error => {
      // Uh-oh, an error occurred!
    })
}

export { uploadImage, getFilePath, deleteImages }
//"https://firebasestorage.googleapis.com/v0/b/teletubby-v2.appspot.com/o/images%2F063763325135.316000000download%20(1).png?alt=media&token=0c482c16-42ff-4a7b-ae59-54e206d5a2d4"
