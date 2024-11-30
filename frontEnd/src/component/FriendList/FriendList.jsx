import React from 'react'
import "./FriendList.css"
import img from "../../assets/download.png"
const FriendList = () => {
    return (
        <div className='flex p-3' style={{flexDirection:"column",backgroundColor:"#181818"}}>
            <h3>Friend list</h3>
            <div className='FriendList'>
                <img src={img} alt="" />
                <span>Ghaith</span>
                <span>remove friend</span>
            </div>
        </div>
    )
}

export default FriendList