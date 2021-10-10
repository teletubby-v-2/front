import { useLocation } from 'react-router-dom'

export function useSearchParam(find: string) {
  return new URLSearchParams(useLocation()?.search).get(find) || ''
}
