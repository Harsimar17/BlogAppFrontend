import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Input,
  Label,
} from "reactstrap";
import { cAt } from "../services/Category-service";
import JoditEditor from "jodit-react";
import { createPost } from "../services/create-Post";
import { fetchDetails, isLogin } from "../auth/Index";
import { imageHandle } from "../services/Service";
export default function AddPost() {
  const editor = useRef(null);
  // const [content, setcontent] = useState("");
  const [ct, setct] = useState([]);
  const [fld, setfld] = useState({
    title: "",
    content: "",
    categoryid: "",
  });
  const [userDet, setuserDet] = useState(undefined);
  const [img, setimg] = useState(null);
  useEffect(() => {
    setuserDet(fetchDetails());
    cAt()
      .then((data) => {
        // console.log(data);
        setct(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const fieldChange = (e) => {
    setfld({
      ...fld,
      [e.target.name]: e.target.value,
    });
  };
  const contentChange = (e) => {
    setfld({
      ...fld,
      content: e,
    });
  };
  const formSub = (e) => {
    e.preventDefault();
    if (
      fld.title.trim() === "" &&
      fld.content.trim() === "" &&
      fld.categoryid.trim() === ""
    ) {
      toast.error("Please fill all the fields!!");
      return;
    }
    if (fld.title.trim() === "") {
      toast.error("Title is empty!!");
      return;
    } else if (fld.content.trim() === "") {
      toast.error("Content is empty!!");
      return;
    } else if (fld.categoryid.trim() === "") {
      toast.error("Please selet a category!!");
      return;
    }
    fld["uid"] = userDet.id;
    createPost(fld)
      .then((resp) => {
        console.log(resp);
        imageHandle(img, resp.id).then((resp) => {
          toast.success("New post created");
        });
      })
      .catch(() => {
        toast.error("Some error occured!!");
      });
  };
  const handleImage = (e) => {
    // setimg(e.target.files[0]);
    console.log(e.target.files[0]);
    setimg(e.target.files[0]);
  };
  return (
    <div className="wrapper ">
      
      <Card>
        <CardBody>
          <h1 align="left">
            <i>What's going on your mind...</i>
          </h1>
          <br />
          <Form onSubmit={formSub}>
            <div className="my-3" align="left">
              <Label for="title">
                <h3>Enter title</h3>
              </Label>
              <Input
                type="text"
                id="title"
                placeholder="Enter here"
                name="title"
                onChange={fieldChange}
              />
            </div>
            <div className="my-3" align="left">
              <Label for="content">
                <h3>Enter Content</h3>
              </Label>
              <JoditEditor
                ref={editor}
                value={fld.content}
                onChange={contentChange}
              />
            </div>
            <div className="my-3" align="left">
              <Label for="formFile">
                <h3>Select image</h3>
              </Label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                multiple
                onChange={handleImage}
              />
            </div>
            <div className="my-3" align="left">
              <Label for="category">
                <h3>Select category</h3>
              </Label>

              <Input
                type="select"
                id="category"
                name="categoryid"
                placeholder="Enter here"
                onChange={fieldChange}
                defaultValue={0}
              >
                <option disabled value={0}>
                  --Select category--
                </option>
                {ct.map((dt) => (
                  <option value={dt.id} key={dt.id}>
                    {dt.title.toUpperCase()}
                  </option>
                ))}
              </Input>
            </div>
            <Container>
              <Button color="primary">Add Post</Button>
            </Container>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
