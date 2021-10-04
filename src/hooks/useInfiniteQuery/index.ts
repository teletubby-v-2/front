/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase/app'
import { useEffect, useState } from 'react'

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
  const [lastDoc, setLastDoc] = useState<firebase.firestore.DocumentData>()
  const [query, setQuery] = useState<firebase.firestore.Query>(initQuery)

  const getNewPageData = async () => {
    let thisPageData = null
    if (lastDoc) thisPageData = await query.startAfter(lastDoc).limit(limit).get()
    else thisPageData = await query.limit(limit).get()
    setLastDoc(thisPageData.docs[thisPageData.size - 1])

    if (thisPageData.size < limit) setHasNext(false)
    else setHasNext(true)
    return thisPageData.docs.map(doc => ({ [fieldId]: doc.id, ...doc.data() } as unknown as TData))
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
    fetchMore()

    // const unsubscribe = query
    //   .orderBy('createAt', 'desc')
    //   .limit(1)
    //   .onSnapshot(snap => {
    //     for (const change of snap.docChanges()) {
    //       const newData = { [fieldId]: change.doc.id, ...change.doc.data() }
    //       if (!data.some((item: any) => item[fieldId] === newData[fieldId]))
    //         setData(data => [newData as TData, ...data])
    //     }

    //   })
    // return unsubscribe
  }, [query])

  return { data, hasNext, currentPage, isLoading, error, fetchMore, setQuery }
}
