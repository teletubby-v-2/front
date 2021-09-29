import firebase from 'firebase/app'
import { useEffect, useState } from 'react'

export function useInfiniteQuery<TData = unknown, TError = unknown>(
  query: firebase.firestore.Query,
  fieldId = 'id',
  limit = 10,
) {
  const [data, setData] = useState<TData[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<TError>()
  const [hasNext, setHasNext] = useState(true)
  const [lastDoc, setLastDoc] = useState<firebase.firestore.DocumentData>()

  const getNewPageData = async () => {
    let thisPageData = null
    if (lastDoc) thisPageData = await query.startAfter(lastDoc).limit(limit).get()
    else thisPageData = await query.limit(limit).get()
    setLastDoc(thisPageData.docs[thisPageData.size - 1])
    if (thisPageData.size < limit) setHasNext(false)
    return thisPageData.docs.map(doc => ({ [fieldId]: doc.id, ...doc.data() } as unknown as TData))
  }

  const fetchMore = () => {
    setCurrentPage(page => page + 1)
  }

  useEffect(() => {
    setIsLoading(true)
    getNewPageData()
      .then(newData => setData(data => [...data, ...newData]))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false))
  }, [currentPage])

  return { data, hasNext, currentPage, isLoading, error, fetchMore }
}
