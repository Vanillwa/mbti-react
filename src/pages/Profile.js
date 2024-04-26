import React from 'react';
import { useQuery } from 'react-query';
import { useParams} from 'react-router-dom';
import { getPostByUserId } from '../service/api';

const Profile = () => {

  const {userId} = useParams();
  
  console.log(userId)
  const { data, status } = useQuery(
    ["getPostByUserId", userId],
    () => getPostByUserId(userId),
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
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
    <div className='post'>
      {data.userInfo.nickname}
    </div>
  );
};

export default Profile;