import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState([]);

  // get post by id

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/user/get-post/${id}`
        );
        setPost(response.data.data.post);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, []);

  //delete post
  useEffect(() => {});
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4001/api/user/delete-post/${id}`
      );
      navigate("/");

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen mt-24 mb-48">
        <div className="flex flex-wrap w-3/4 align-middle overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md justify-center mt-24 max-md:mt-1">
          <div className="w-full p-2  cursor-pointer">
            <img
              className="w-full h-96 object-cover mt-5 max-sm:h-26 max-md:mt-5"
              src={post?.image}
              alt="blogimg"
            />
            <div class="p-6">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {post?.title}
              </h4>
              <div>
                <p className="block mt-3 font-sans text-lg antialiased font-normal leading-relaxed text-gray-700 text-left max-sm:text-xs">
                  {post?.description}
                </p>
              </div>
              <Link to="/edit-post">
                <button className="bg-blue-700 text-white p-2 mt-3">
                  EDIT
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-800 text-white p-2 m-2 mt-3"
              >
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostDetail;
