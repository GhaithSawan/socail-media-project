import React from 'react'
import userimg from "../../assets/profilePhoto.jpg";
import "./Post.css"
import { IoPersonAddOutline } from "react-icons/io5";

const Post = () => {
    return (
        <div className='Post flex py-1 px-2 my-5' style={{ boxShadow: " 1px 1px 5px 2px rgb(75, 75, 75)", backgroundColor: "#181818", flexDirection: "column", color: "#fff", borderRadius: "10px" }}>
            <div className="info flex  w-100">
                <div className='flex '>
                    <img src={userimg} alt="" />
                    <span>Ghaith</span>
                </div>
                <span className='mx-2' >
                    <IoPersonAddOutline className='icons'/>
                </span>
            </div>
            <div className="desc" style={{ width: "100%" }}>
                djslakdjslajdosad;lasjkdj;aldj;sa
            </div>
            <img style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "10px" }} src={userimg} alt="" />
        </div>
    )
}

export default Post