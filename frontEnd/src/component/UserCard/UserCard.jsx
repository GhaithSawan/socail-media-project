import React from 'react'
import userimg from "../../assets/profilePhoto.jpg";
import "./UserCard.css"
import { CiSettings } from "react-icons/ci";
import { Link } from 'react-router-dom';

const UserCard = () => {
    return (
        <div className='UserCard ' style={{ borderRadius: "10px" }}>
            <div className='flex pb-2'>
                    <Link to={"/Profilepage"} style={{ display: "flex", alignItems: "center" ,width: "100%", textDecoration: "none" }}>
                        <img src={userimg} alt="" />
                        <div>
                            <h3 style={{ color: " #fff" }}>ghaith</h3>
                            <span style={{color: "rgb(140, 140, 140)"}}>3 followers</span>
                        </div>
                    </Link>
                <div className="accountSettings"><CiSettings className='icons' />
                </div>
            </div>
            <div className="PostsNum flex pb-3">
                <span>Posts</span>
                <span style={{ color: " #fff" }} >3</span>
            </div>
            <span className="bio text-center" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic, quisquam harum maiores nulla a, velit ullam praesentium impedit necessitatibus saepe architecto obcaecati reprehenderit quis, assumenda in totam illo rem error.</span>

        </div>
    )
}

export default UserCard