import firebase from 'firebase/app'
import { useEffect, useRef, useState } from 'react'

export function useInfiniteQuery<TData = unknown, TError = unknown>(
  initQuery: firebase.firestore.Query,
  fieldId = 'id',
  limit = 10,
) {
  const [data, setData] = useState<TData[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<TError>()
  const [hasNext, setHasNext] = useState(true)
  const [query, setQuery] = useState<firebase.firestore.Query>(initQuery)
  const lastDocRef = useRef<firebase.firestore.DocumentData>()

  const getNewPageData = async () => {
    let thisPageData = null

    if (lastDocRef.current)
      thisPageData = await query.startAfter(lastDocRef.current).limit(limit).get()
    else thisPageData = await query.limit(limit).get()
    // setLastDoc(thisPageData.docs[thisPageData.size - 1])
    lastDocRef.current = thisPageData.docs[thisPageData.size - 1]
    if (thisPageData.size < limit) setHasNext(false)
    else setHasNext(true)
    return thisPageData.docs.map(doc => ({ [fieldId]: doc.id, ...doc.data() } as TData))
  }

  const fetchMore = () => {
    setIsLoading(true)
    getNewPageData()
      .then(newData => {
        setData(data => [...data, ...newData]), setCurrentPage(page => page + 1)
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    setData([])
    setCurrentPage(0)
    const unsubscribe = query.limit(10).onSnapshot(snap => {
      for (const change of snap.docChanges()) {
        const newData = { [fieldId]: change.doc.id, ...change.doc.data() }
        if (change.type === 'added') {
          if (change.newIndex !== 0) {
            setData(data => [...data, newData as TData])
            lastDocRef.current = change.doc
          } else {
            setData(data => [newData as TData, ...data])
          }
        }
      }
    })
    return unsubscribe
  }, [query])

  return { data, hasNext, currentPage, isLoading, error, fetchMore, setQuery }
}
