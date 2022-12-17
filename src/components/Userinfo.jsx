import React, { useEffect } from "react";
import { useState } from "react";

import { Button, Card, CardBody, Container } from "reactstrap";
import { fetchDetails } from "../auth/Index";
import { BASE_URL } from "../services/Helper";
import FinalUserInfo from "../cmpnts/FinalUserInfo";
import Base from "../cmpnts/Base";
import { profileImage } from "../services/Service";

export default function Userinfo() {
  const [userDetails, setuserDetails] = useState(null);
  const [img, setimg] = useState(null);
  useEffect(() => {
    setuserDetails(fetchDetails());
  }, []);

  const handleProfile = (e) => {
    setimg(e.target.files[0]);
  };
  const saveProfileImage = (e) => {
    profileImage(img, userDetails.id, userDetails.email);
  };

  const data = () => {
    return (
      <div>
        <FinalUserInfo userDetails={userDetails} />
      </div>
    );
  };
  return (
    userDetails && (
      <Base>
        <Card className="container mx-auto" style={{ width: "60%" }}>
          <CardBody>
            <h3 align="left" className="text-uppercase">
              User Information
            </h3>
            <div align="right">
              <h3>
                {userDetails.set.map((r) => {
                  return <div class="badge text-bg-warning"> {r.name}</div>;
                })}
              </h3>
            </div>
            <Container>
              <img
                style={{ maxWidth: "20%" }}
                id="image-selector"
                className="rounded-circle img-responsive border border-5 "
                src={`${BASE_URL}/profile/image/${userDetails.imagename}/${userDetails.email}`}
                alt=""
              />
              <br />
              <br />
              <h4>
                <label className="badge text-bg-danger border-0" for="files">
                  Change{" "}
                </label>
              </h4>
              <form onSubmit={saveProfileImage}>
                <input
                  accept="image/*"
                  type="file"
                  id="files"
                  onChange={(e) => handleProfile(e)}
                  multiple
                />
                <br />
                <Button onClick={(e) => saveProfileImage(e)}>Done</Button>
                <h4></h4>
              </form>
            </Container>
            <br />
            <br />
            <div align="center">{userDetails && data()}</div>
          </CardBody>
        </Card>
      </Base>
    )
  );
}
