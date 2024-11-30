import React from 'react'
import UserCard from '../component/UserCard/UserCard'
import { CreatePost } from '../component/CreatePost/CreatePost'

const Homepage = () => {
  return (
    <div>
      <UserCard />
      <CreatePost />
    </div>
  )
}

export default Homepage