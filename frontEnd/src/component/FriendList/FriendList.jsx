import React from 'react'
import "./FriendList.css"
import img from "../../assets/download.png"
const FriendList = () => {
    return (
        <div className='flex p-3' style={{ color: "#fff", flexDirection: "column", backgroundColor: "#181818" }}>
            <h4>Friend list</h4>
            <div className='FriendList flex '>
                <div className='flex gap-1'>
                    <img src={img} alt="" />
                    <span>Ghaith</span>
                </div>
                <span>remove friend</span>
            </div>
        </div>
    )
}

export default FriendList