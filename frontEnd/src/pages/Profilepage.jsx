import React from 'react'
import UserCard from '../component/UserCard/UserCard'
import FriendList from '../component/FriendList/FriendList.jsx'
import Posts from '../component/postscompontent/posts.jsx'
import { CreatePost } from '../component/CreatePost/CreatePost.jsx'

const Profilepage = () => {
  return (
    <div className='Profilepage  container mt-5 ' style={{display:"flex",alignItems:"start",justifyContent:"space-around"}}>
      <div className='' style={{width:"30%",display:"flex",alignItems:'center',justifyContent:"center",flexDirection:"column",gap:"20px"}}>
        <UserCard />
        <FriendList />
      </div>
      <div  style={{width:"50%"}}>
          <CreatePost/>
        <Posts />
      </div>
    </div>
  )
}

export default Profilepage