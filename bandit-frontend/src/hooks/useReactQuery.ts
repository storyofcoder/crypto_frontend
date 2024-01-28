import { useInfiniteQuery as useReactInfiniteQuery, useQuery as useReactQuery } from "react-query";

const useQuery = (queryKey, queryFn, options?) => {
  const queryResult = useReactQuery(queryKey, queryFn, {
    retry: false,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    ...options,
  })
  return queryResult
}
const useInfiniteQuery = (queryKey, queryFn, options?) => {
  const queryResult = useReactInfiniteQuery(queryKey, queryFn, {
    retry: false,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    ...options,
  })
  return queryResult
}

export { useQuery, useInfiniteQuery }
