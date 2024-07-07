import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);

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
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-wrap w-3/4 align-middle overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md justify-center">
        <div class="w-full p-2  cursor-pointer">
          <img
            className="w-full h-96 object-cover mt-5"
            src={post.image}
            alt="blogimg"
          />
          <div class="p-6">
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {post.title}
            </h4>
            <div>
              <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700 text-left">
                {post.description}
              </p>
            </div>
            <button className="bg-blue-700 text-white p-2">EDIT</button>
            <button className="bg-red-800 text-white p-2 m-2">DELETE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
