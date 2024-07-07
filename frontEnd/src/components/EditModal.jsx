import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
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
import axios from "axios";

export function EditModal() {
  const navigate = useNavigate();
  const { id } = useParams();
console.log(id);
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
console.log(title);
  //update post

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      const response = await axios.put(
        `http://localhost:4001/api/user/edit-post/${id}`,
        formData
      );
      if (response.status === 200) {
        console.log("successfully updated", response);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between p-5"></div>
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
              {/* <JoditEditor ref={editor}
              value={content}
              onChange={newContent=>setContent(newContent)}
            /> */}
              <Textarea label="Tell your story..." />
            </div>
          </div>
        </DialogBody>
        <Input id="picture" type="file"
        onChange={(e) => setImage(e.target.files[0])} />
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            <Link to="/"> cancel</Link>
          </Button>
          <Button variant="gradient" color="gray" onClick={handleSubmit}>
            Post
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
