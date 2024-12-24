import React from 'react'
import "./FriendList.css"
import img from "../../assets/profilePhoto.jpg"
import { MdOutlinePersonRemoveAlt1 } from "react-icons/md";
import { Link } from 'react-router-dom';

const FriendList = () => {
    return (
        <div className='flex p-3 w-100' style={{ boxShadow: " 1px 1px 5px 2px rgb(75, 75, 75)", borderRadius: "10px", color: "#fff", flexDirection: "column", backgroundColor: "#181818" }}>
            <h4>Friend list</h4>
            <div className='FriendList w-100 '>
                <div className="Friend flex w-100">
                    <div className='flex'>
                        <Link to={"/Profilepage"} style={{ width: "100%", textDecoration: "none" }}>
                            <img src={img} alt="" />
                            <span style={{ color: "#fff" ,fontWeight:"500" ,fontSize:"17px"}}>Ghaith</span>
                        </Link>
                    </div>
                    <span><MdOutlinePersonRemoveAlt1 className='icons' /></span>
                </div>
            </div>
        </div>
    )
}

export default FriendList