import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import Home from "./Home";
import axios from "axios";

export function Post() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // create post function

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      console.log(title, description);
      const response = await axios.post(
        "http://localhost:4001/api/user/post",
        formData
      );
      if (response.status === 201) {
        console.log("successfully created", response);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      {/* <Button onClick={handleOpen}>Message Dialog</Button> */}
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between p-5">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg> */}
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Write your story
          </Typography>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Title
            </Typography>
            <div onChange={(e) => setTitle(e.target.value)}>
              <Input label="Title" />
            </div>
            <div onChange={(e) => setDescription(e.target.value)}>
              <Textarea label="Tell your story..." />
            </div>
          </div>
        </DialogBody>
        <Input
          id="picture"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            <Link to="/"> cancel</Link>
          </Button>
          <Button variant="gradient" color="gray" onClick={handleCreate}>
            Post
          </Button>
        </DialogFooter>
      </Dialog>
      <Home />
    </>
  );
}
