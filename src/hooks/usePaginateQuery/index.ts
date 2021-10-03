import firebase from 'firebase/app'
import { useEffect, useState } from 'react'

export function usePaginateQuery<TData = unknown, TError = unknown>(
  query: () => firebase.firestore.Query | firebase.firestore.Query,
  initPage = 0,
  limit = 10,
) {
  const [loading, setLoading] = useState(false)
  const [currentPage, gotoPage] = useState(initPage)
  const [data, setData] = useState<TData[]>()
  const [error, setError] = useState<TError>()

  const getNewPageData = async () => {
    const thisPageData = await query().orderBy('createAt').startAt(0).limit(limit).get()
    return thisPageData.docs.map(doc => ({ lectureId: doc.id, ...doc.data() } as unknown as TData))
  }

  const gotoNextPage = () => {
    gotoPage(page => page + 1)
  }

  const gotoPrevPage = () => {
    gotoPage(page => page - 1)
  }

  useEffect(() => {
    setLoading(true)
    getNewPageData()
      .then(newData => setData(newData))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [currentPage])

  return { data, currentPage, gotoNextPage, gotoPrevPage, loading, error }
}
