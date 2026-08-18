import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER)

  const createUser = async (user) => {
    const response = await mutate({
      variables: {
        user
      }
    })

    return response.data.createUser
  }

  return [createUser, result]
}

export default useCreateUser;