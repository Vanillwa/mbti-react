import { QueryClient, useMutation, useQuery } from "react-query";
import { getUserList, releaseUser } from "../service/api";

function UserItems({ filter, keyword, type }) {
  const queryClient = new QueryClient();
  const { data, status, refetch } = useQuery(
    ["getUserList", filter, keyword, type],
    () => getUserList(filter, keyword, type),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const releaseMutate = useMutation(userId => {
    return releaseUser(userId);
  });

  const handleReleaseBlock = (userId) => {
    releaseMutate.mutate(userId,{
      onSuccess: async () => {
        console.log("onSuccess");
        await queryClient.invalidateQueries(["getUserList",filter,keyword,type]);
        await refetch();
        return;
      },
    });
    // const result =await releaseUser(userId)
  };

  if (status === "loading") {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  } else if (status === "error") {
    return (
      <div className="container">
        <h1>error!</h1>
      </div>
    );
  }

  return (
    <>
      {data.map(item => {
        return (
          <div key={item.userId}>
            <span>유저ID:{item.userId}</span>
            <span>이메일 :{item.email}</span>
            <span> 닉네임:{item.nickname}</span>
            <span>
              상태 :{item.status}
              {item.status === "blocked" ? (
                <button
                  type="button"
                  onClick={() => handleReleaseBlock(item.userId)}>
                  차단해제
                </button>
              ) : null}
            </span>
          </div>
        );
      })}
    </>
  );
}

export default UserItems;
