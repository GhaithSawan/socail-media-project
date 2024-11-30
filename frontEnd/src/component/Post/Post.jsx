import React from 'react'
import userimg from "../../assets/download.png";

const Post = () => {
    return (
        <div>
            <div className="info flex w-100">
                <div className='flex gap-1'>
                    <img src={img} alt="" />
                    <span>Ghaith</span>
                </div>
                <span>add friend</span>
            </div>
            <div className="desc">
                djslakdjslajdosad;lasjkdj;aldj;sa
            </div>
            <img src={userimg} alt="" />
        </div>
    )
}

export default Post