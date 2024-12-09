import React from 'react'
import "./CreatePost.css"
import Form from 'react-bootstrap/Form';
import img from "../../assets/profilePhoto.jpg"
import { CiImageOn } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";


export const CreatePost = () => {
    return (
        <div className='CreatePost flex  m-auto ' style={{ borderRadius: "10px", boxShadow: " 1px 1px 5px 2px rgb(75, 75, 75)" }}>
            <div className="upper flex">
                <img src={img} alt="" />
                <Form className="d-flex " style={{ width: "90%" }}>
                    <Form.Control
                        type="text"
                        placeholder="Whats in your mind"
                        className="me-2 searchbar"
                        aria-label="Search"
                    />
                </Form>
            </div>
            <div className="lower flex">
                <button className=' w-50 ' style={{fontSize:"17px"}}> <CiImageOn  className='icons mx-1' /> image</button>
                <button className=' w-50 ' style={{fontSize:"17px"}}> <IoIosAddCircleOutline  className='icons mx-1'/>
                Post</button>
            </div>
        </div >
    )
}
