import { UploadFile } from 'antd/lib/upload/interface'
import { imagesRef, pdfRef, storageRef } from './../../config/firebase'
import firebase from 'firebase/app'
import { fromPath } from 'pdf2pic'

const options = {
  density: 100,
  saveFilename: 'untitled',
  savePath: './images',
  format: 'png',
  width: 600,
  height: 600,
}

// function getBase64(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result as string)
//     reader.onerror = error => reject(error)
//   })
// }

// async function uploadCoverPdf(file: File) {
//   const pdfBase64: string = await getBase64(file)
//   console.log(pdfBase64)
//   const storeAsImage = fromBase64(pdfBase64, options)
//   const pageToConvertAsImage = 1

//   const image = await storeAsImage(pageToConvertAsImage)
// }

async function uploadCoverPdf(url: string) {
  const storeAsImage = fromPath(url, options)
  const pageToConvertAsImage = 1

  storeAsImage(pageToConvertAsImage).then(resolve => {
    console.log('Page 1 is now converted as image')
    console.log(resolve)
  })
}

async function uploadImage(file: File): Promise<UploadFile> {
  const timeStamp: firebase.firestore.Timestamp = firebase.firestore.Timestamp.fromDate(new Date())
  const metadata = {
    contentType: file.type,
  }
  return new Promise<UploadFile>((resolve, rejects) => {
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
          console.error(error)
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

async function uploadPdf(file: File): Promise<UploadFile> {
  const timeStamp: firebase.firestore.Timestamp = firebase.firestore.Timestamp.fromDate(new Date())
  const metadata = {
    contentType: file.type,
  }
  return new Promise<UploadFile>((resolve, rejects) => {
    try {
      const uploadTask = pdfRef.child(timeStamp + file.name).put(file, metadata)
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
          console.error(error)
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

const deleteImages = async (imageUrl: string) => {
  const desertRef = storageRef.child(getFilePath(imageUrl))
  // Delete the file
  desertRef.delete()
}

export { uploadImage, getFilePath, deleteImages, uploadPdf, uploadCoverPdf }
