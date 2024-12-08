import React from 'react'
import UserCard from '../component/UserCard/UserCard'
import { CreatePost } from '../component/CreatePost/CreatePost'
import FriendList from '../component/FriendList/FriendList'
import Posts from '../component/postscompontent/posts'

const Homepage = () => {
  return (
    <div className='Homepage py-5' style={{ display: "flex", alignItems: "start", justifyContent: "space-around" }}>
      <div style={{ width: "20%" }}>
        <UserCard />
      </div>
      <div className='w-60' style={{ width: "45%" }}>
        <CreatePost />
        <Posts />
      </div>
      <div style={{ width: "20%" }}>
        <FriendList />
      </div>
    </div>
  )
}

export default Homepage