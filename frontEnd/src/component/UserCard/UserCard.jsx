import React from 'react'
import userimg from "../../assets/download.png";
import "./UserCard.css"
const UserCard = () => {
    return (
        <div className='UserCard '>
            <div className='flex pb-2'>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={userimg} alt="" />
                    <div>
                        <h3 style={{ color: " #fff" }}>ghaith</h3>
                        <span>3 followers</span>
                    </div>
                </div>
                <div className="accountSettings">accountSettings</div>
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