import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
// import {  CardBody } from "reactstrap";
import { fetchDetails } from "../auth/Index";
import Base from "../components/Base";
import { onePost, updatePost } from "../services/Service";
import { useRef } from "react";
// import {  } from "react-toastify";
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

function UpdatePost() {
  const editor = useRef(null);
  const [ct, setct] = useState([]);
  const [post, setpost] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    cAt().then((data) => {
      // //(data);
      setct(data);
    });
    onePost(Object.values(params))
      .then((res) => {
        console.log(res);
        setpost({ ...res, ctgryId: res.ct.id });
      })
      .catch((error) => {
        toast.error("Error");
      });
  }, []);

  useEffect(() => {
    const id = fetchDetails().id;
    // console.log(id);
    if (post) {
      if (post.u.id !== id) {
        localStorage.removeItem("data");
        toast.error("Not ur");
        navigate("/login");
      }
    }
  }, [post]);
  const handleChange = (event, field) => {
    setpost({
      ...post,
      [field]: event.target.value,
    });
    // console.log(post.ctgryId);
    // console.log(post);
  };
  const submitForm = (e) => {
    e.preventDefault();

    // console.log(post.ctgryId);
    let i = post.ctgryId;

    // console.log(post);
    let npost = post;
    // console.log(post.ct.id);
    updatePost({ ...npost, ct: { id: npost.ctgryId } }, npost.id);
  };
  const updateHtml = () => {
    return (
      <div className=" ">
        <Card>
          <CardBody>
            <h1 align="left">
              <i>Update post from here...</i>
            </h1>
            <br />
            <Form onSubmit={submitForm}>
              <div className="my-3" align="left">
                <Label for="title">
                  <h3>Enter title</h3>
                </Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here"
                  name="title"
                  onChange={(e) => handleChange(e, "title")}
                  value={post.title}
                />
              </div>
              <div className="my-3" align="left">
                <Label for="content">
                  <h3>Enter Content</h3>
                </Label>
                <JoditEditor
                  ref={editor}
                  value={post.content}
                  onChange={(newContent) =>
                    setpost({ ...post, content: newContent })
                  }
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
                  onChange={""}
                />
              </div>
              <div className="my-3" align="left">
                <Label for="category">
                  <h3>Select category</h3>
                </Label>
                {post.ct.title}
                <Input
                  type="select"
                  id="category"
                  name="ctgryId"
                  placeholder="Enter here"
                  onChange={(e) => handleChange(e, "ctgryId")}
                  defaultValue={0}
                  value={post.ctgryId}
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
  };
  return (
    <Base>
      {/* {Object.values(params) */}
      <div className="container">{post && updateHtml()}</div>
    </Base>
  );
}

export default UpdatePost;
