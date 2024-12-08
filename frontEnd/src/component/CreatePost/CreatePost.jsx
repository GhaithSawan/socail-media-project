import React from 'react'
import "./CreatePost.css"
import Form from 'react-bootstrap/Form';
import img from "../../assets/download.png"
export const CreatePost = () => {
    return (
        <div className='CreatePost flex  m-auto ' style={{ borderRadius: "10px", boxShadow: " 1px 1px 5px 2px rgb(75, 75, 75)" }}>
            <div className="upper flex">
                <img src={img} alt="" />
            </div>
            <div className="lower flex">
                <Form className="d-flex col-4  " style={{ width: "90%" }}>
                    <Form.Control
                        type="text"
                        placeholder="Whats in your mind"
                        className="me-2 searchbar"
                        aria-label="Search"
                    />
                </Form>
                <button className='importimgbtn'>image</button>
            </div>
        </div >
    )
}
