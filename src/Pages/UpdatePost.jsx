import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchDetails } from "../auth/Index";
import Base from "../components/Base";
import { imageHandle, onePost, updatePost } from "../services/Service";
import { useRef } from "react";
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
  const [img, setimg] = useState({
    pic: false,
    src: false,
  });
  const params = useParams();
  useEffect(() => {
    cAt().then((data) => {
      setct(data);
    });
    onePost(Object.values(params))
      .then((res) => {
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
  };

  const submitForm = (e) => {
    e.preventDefault();

    let npost = post;

    updatePost({ ...npost, ct: { id: npost.ctgryId } }, npost.id).then(() => {
      imageHandle(img.src, post.id,fetchDetails().email).then(() => {
        toast.success("Post updated successfully!!");
      });
    });
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
                <br />
                {img.pic ? (
                  <img
                    src={img.pic}
                    style={{ maxWidth: "10%", marginBottom: "10px" }}
                    className="rounded-circle img-responsive border border-5 "
                    alt=""
                  />
                ) : (
                  <div
                    style={{
                      maxWidth: "10%",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                    className="rounded-circle img-responsive border border-5 text-center"
                  >
                    <p style={{ marginTop: "20px", fontSize: "13px" }}>
                      Choose an Image
                    </p>
                  </div>
                )}
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  multiple
                  onChange={(e) =>
                    setimg({
                      pic: URL.createObjectURL(e.target.files[0]),
                      src: e.target.files[0],
                    })
                  }
                />
              </div>
              <div className="my-3" align="left">
                <Label for="category">
                  <h3>Select category</h3>
                </Label>

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
      <div className="container">{post && updateHtml()}</div>
    </Base>
  );
}

export default UpdatePost;
