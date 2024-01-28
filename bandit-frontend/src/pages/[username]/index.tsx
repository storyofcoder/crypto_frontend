import UserProfile from "../../views/Profile";
import { dehydrate, QueryClient } from "react-query";
import { PROFILE } from "../../constant/queryKeys";
import { getProfileData } from "../../state/Profile/helpers";

export async function getServerSideProps(context) {
  const { params } = context
  const { username } = params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([PROFILE, username], () => getProfileData(username.toLowerCase()))
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default UserProfile
