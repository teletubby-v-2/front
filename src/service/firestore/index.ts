import { firestore } from '../../config/firebase'

async function getAllCollection(collectionName: string): Promise<any> {
  const documents = await firestore.collection(collectionName).get()
  const data: any = []
  documents.forEach(document => {
    console.log(document.data)
    data.push({
      id: document.id,
      ...document.data(),
    })
  })
  return data
}

export { getAllCollection }
