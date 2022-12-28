import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import HomeHeader from "../../HomePage/HomeHeader";
// import "./Info.scss";
import { useState } from "react";
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { editUserAPI, getAllUsers } from "../../../services/userService";
import { toast } from "react-toastify";
import { useEffect } from "react";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
function Info(props) {
  const [userInfo, setUserInfo] = useState();
  const [lastName, setLastName] = useState();
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [image, setImage] = useState();
  const [gender, setGender] = useState();
  const [base64, setBase64] = useState();
  const [address, setAddress] = useState();
  const [isLastName, setIsLastName] = useState(false);
  const [isFirstName, setIsFirstName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddress, setIsAddress] = useState(false);
  useEffect (() => {
    getUserInfo()
  },[])
  const getUserInfo=async() => {
    let res = await getAllUsers(props.userInfo.id)
    if(res && res.users && res.errCode===0){
      setUserInfo(res.users)
      setLastName(res.users.lastName)
      setFirstName(res.users.firstName)
      setEmail(res.users.email)
      setPhone(res.users.phoneNumber)
      setImage(res.users.image)
      setGender(res.users.gender)
      setAddress(res.users.address)
      props.userLoginSuccess(res.users);
    }
  }
  const handlerOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      setImage(objectURL);
      setBase64(base64);
    }
  };
  const handleSubmit=async()=>{
    let res = await editUserAPI({
      id: props.userInfo.id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phone,
      image: base64,
      roleId: props.userInfo.roleId,
      positionID: props.userInfo.positionID,
      gender: gender,
      address: address,
    })
    if(res && res.errCode ===0){
      toast.success("Successfully update!");
      getUserInfo()
    }else{
      toast.error("Error update!");
    }
  }
  return (
    <div className="info-container">
      <div className="container">
        <div className="row">
          <div className="nav-right col-12 row">
            <div className="content-info">
              <div className="info-top">
                <h4>Hồ sơ của tôi</h4>
                <p>Quản lý thông tin cá nhân để bảo mật tài khoản</p>
              </div>
              <div className="info-center row">
                <div className="left col-8">
                  <div>
                    <b>Họ: </b>
                    {isLastName ? (
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    ) : (
                      <p>{lastName}</p>
                    )}
                    <p
                      className="update"
                      onClick={() => {
                        setIsLastName(!isLastName);
                        setLastName(userInfo.lastName);
                      }}
                    >
                      {isLastName ? "Quay lại" : "Thay đổi"}
                    </p>
                  </div>
                  <div>
                    <b>Tên: </b>
                    {isFirstName ? (
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    ) : (
                      <p>{firstName}</p>
                    )}
                    <p
                      className="update"
                      onClick={() => {
                        setIsFirstName(!isFirstName);
                        setFirstName(userInfo.firstName);
                      }}
                    >
                      {isFirstName ? "Quay lại" : "Thay đổi"}
                    </p>
                  </div>
                  <div>
                    <b>Email: </b>
                    {isEmail ? (
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    ) : (
                      <p>{email}</p>
                    )}
                    <p
                      className="update"
                      onClick={() => {
                        setIsEmail(!isEmail);
                        setEmail(userInfo.email);
                      }}
                    >
                      {isEmail ? "Quay lại" : "Thay đổi"}
                    </p>
                  </div>
                  <div>
                    <b>Số điện thoại: </b>
                    {isPhone ? (
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    ) : (
                      <p>{phone}</p>
                    )}
                    <p
                      className="update"
                      onClick={() => {
                        setIsPhone(!isPhone);
                        setPhone(userInfo.phoneNumber);
                      }}
                    >
                      {isPhone ? "Quay lại" : "Thay đổi"}
                    </p>
                  </div>
                  <div>
                    <b>Địa chỉ: </b>
                    {isAddress ? (
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    ) : (
                      <p>{address}</p>
                    )}
                    <p
                      className="update"
                      onClick={() => {
                        setIsAddress(!isAddress);
                        setAddress(userInfo.address);
                      }}
                    >
                      {isAddress ? "Quay lại" : "Thay đổi"}
                    </p>
                  </div>
                  <FormControl>
                    <div className="gender">
                      <b>Giới tính: </b>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={gender??''}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <FormControlLabel
                          value="F"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="M"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="O"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                    </div>
                  </FormControl>
                  <div>
                    <b></b>
                    <button type="button" className="btn btn-warning" onClick={handleSubmit}>
                      Lưu
                    </button>
                  </div>
                </div>
                <div className="right">
                  <div
                    className="image"
                    style={{
                      backgroundImage: `url(${
                        image ? image : "https://i.imgur.com/LntFpBn.png"
                      })`,
                    }}
                  ></div>
                  <div>
                    <div className="input">
                      <input
                        type="file"
                        onChange={(e) => handlerOnChangeImage(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Info);
