import { Button } from "reactstrap";

import { deleteAccount } from "../services/Service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function FinalUserInfo({ userDetails }) {
  const navigate = useNavigate();
  const deleteMyAccount = () => {
    deleteAccount(userDetails.id)
      .then(() => {
        toast.success("Deleted successfully!!");
        localStorage.removeItem("data");
        navigate("/login");
        return;
      })
      .catch((error) => {
        toast.error("You are not Admin!!");
        return;
      });
  };
  return (
    <div>
      <div>
        <div
          align="left"
          style={{
            backgroundColor: "lightgoldenrodyellow",
            maxWidth: "30%",
            borderRadius: "10px",
          }}
        >
          <h4 className="ms-2 mt-2">ID : {userDetails.id}</h4>
          <h4 className="ms-2 mt-2">Name : {userDetails.name}</h4>
          <h4 className="ms-2 mt-2">Email : {userDetails.email}</h4>
          <h4 className="ms-2 mt-2">About : {userDetails.about}</h4>
        </div>
        <br />
        <Button
          className="btn btn-danger rounded-pill"
          onClick={deleteMyAccount}
        >
          <b>Delete MyAccount</b>
        </Button>
      </div>
    </div>
  );
}
