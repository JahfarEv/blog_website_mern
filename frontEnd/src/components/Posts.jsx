import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/axiosInterceptors";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await api.get("/user/get-post");
        setPosts(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatas();
  }, []);
  return (
    <div className="flex flex-wrap w-full overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md justify-center mt-24">
      {posts.map((item) => (
        <div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 border cursor-pointer">
          <Link to={`post-detail/${item._id}`}>
            <img
              className="w-full h-48 object-cover "
              src={item.image}
              alt="blogimg"
            />
            <div class="p-6">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {item.title}
              </h4>
              <div className="line-clamp-3">
                <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700 text-left">
                  {item.description}
                </p>
              </div>
              <button className="bg-blue-400 text-white rounded-md p-1 m-2">
                Readmore...
              </button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
