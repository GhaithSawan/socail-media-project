import React from 'react'
import UserCard from '../component/UserCard/UserCard'
import { CreatePost } from '../component/CreatePost/CreatePost'
import FriendList from '../component/FriendList/FriendList'

const Homepage = () => {
  return (
    <div>
      <UserCard />
      <CreatePost />
      <FriendList />
    </div>
  )
}

export default Homepage