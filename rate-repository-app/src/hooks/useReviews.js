import { useQuery } from "@apollo/client/react";
import { GET_REVIEWS } from "../graphql/queries";

const useReviews = (variables) => {
  const { data, loading, error, refetch, fetchMore } = useQuery(GET_REVIEWS, {
    variables
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews?.pageInfo?.hasNextPage

    if (!canFetchMore) return;
    fetchMore({
      variables: {
        ...variables,
        after: data.repository.reviews.pageInfo.endCursor
      }
    })
  }

  return { reviews: data?.repository?.reviews?.edges.map(edge => edge.node), loading, error, refetch, fetchMore: handleFetchMore }
}

export default useReviews;