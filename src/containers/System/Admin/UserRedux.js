import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import TableUserManage from "./TableUserManage";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      position: "",
      role: "",
      image: "",

      action: "",
      isOpenModal: false,
      classify: "ALL",
    };
  }

  async componentDidMount() {
    this.props.getGenderState();
    this.props.getPositionState();
    this.props.getRoleState();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // gender
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    // position
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    // role
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    // user
    if (prevProps.arrUsers !== this.props.arrUsers) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        image: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }
  handlerOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        image: base64,
      });
    }
  };
  openPreviewImg = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handlerOnChangeInput = (input, id) => {
    let copyState = { ...this.state };
    copyState[id] = input.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Bạn chưa nhập: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handlerSaveUser = (e) => {
    e?.preventDefault();
    if (this.checkValidateInput() === false) return;
    // = true thi goi API
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionID: this.state.position,
        image: this.state.image,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUser({
        id: this.state.id,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionID: this.state.position,
        image: this.state.image,
      });
    }
    this.setState({
      isOpenModal: false,
    });
  };
  handlerEditUserFromParent = (user) => {
    this.setState({
      isOpenModal: true,
    });
    let imgBase64 = "";
    if (user.image) {
      imgBase64 = Buffer.from(user.image, "base64").toString("binary");
    }
    this.setState({
      id: user.id,
      email: user.email,
      password: "disabled",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      role: user.roleId,
      position: user.positionID,
      action: CRUD_ACTIONS.EDIT,
      image: "",
      previewImgURL: imgBase64,
    });
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  toggle = () => {
    this.toggleUserModal();
    let arrGenders = this.props.genderRedux;
    let arrPositions = this.props.positionRedux;
    let arrRoles = this.props.roleRedux;
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      image: "",
      previewImgURL: "",
      gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      position:
        arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      action: CRUD_ACTIONS.CREATE,
    });
  };
  handlerOnChangeClassify = (e) => {
    this.setState({
      classify: e.target.value,
    });
  };
  render() {
    const { language } = this.props;
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      position,
      role,
      image,
    } = this.state;
    return (
      <>
        <div className="text-center">
          <h1 className="h2 mb-4 text-gray-800 mt-4">
            <FormattedMessage id="menu.admin.manage-user.crud-redux" />
          </h1>
        </div>
        <Modal
          isOpen={this.state.isOpenModal}
          toggle={() => {
            this.toggle();
          }}
          className={"modal-user-container"}
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            {this.state.action === CRUD_ACTIONS.EDIT
              ? "Edit User"
              : "Add New User"}
          </ModalHeader>
          <ModalBody>
            <form onSubmit={(e) => {
              this.handlerSaveUser(e);
            }}>
              <div className="container">
                <div className="row">
                  <h1>{this.props.isLoading ? "Loading..." : ""}</h1>
                  <div className="col-6 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      required
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => this.handlerOnChangeInput(e, "email")}
                      // disabled={
                      //   this.state.action === CRUD_ACTIONS.EDIT ? true : false
                      // }
                    />
                  </div>
                  <div className="col-6 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => this.handlerOnChangeInput(e, "password")}
                      // disabled={
                      //   this.state.action === CRUD_ACTIONS.EDIT ? true : false
                      // }
                    />
                  </div>

                  <div className="col-6 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => this.handlerOnChangeInput(e, "firstName")}
                    />
                  </div>
                  <div className="col-6 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      name="lastName"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => this.handlerOnChangeInput(e, "lastName")}
                    />
                  </div>

                  <div className="col-12 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      name="address"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => this.handlerOnChangeInput(e, "address")}
                    />
                  </div>
                  <div className="col-4 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select
                      required
                      value={gender}
                      name="gender"
                      className="form-control"
                      onChange={(e) => this.handlerOnChangeInput(e, "gender")}
                    >
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-4 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      value={position}
                      name="position"
                      className="form-control"
                      onChange={(e) => this.handlerOnChangeInput(e, "position")}
                    >
                      {positions &&
                        positions.length > 0 &&
                        positions.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-4 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select
                      value={role}
                      name="role"
                      className="form-control"
                      onChange={(e) => this.handlerOnChangeInput(e, "role")}
                    >
                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => {
                          return (
                            <option key={index} value={item.keyMap}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-5 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.phone" />
                    </label>
                    <input
                      required
                      pattern="[0]{1}[0-9]{9}"
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) =>
                        this.handlerOnChangeInput(e, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-5 mt-2">
                    <label>
                      <FormattedMessage id="manage-user.image" />
                    </label>
                    <br />
                    <input
                      type="file"
                      onChange={(e) => this.handlerOnChangeImage(e)}
                    />
                    <div
                      className="preview-image"
                      style={{
                        backgroundImage: `url("${this.state.previewImgURL}")`,
                      }}
                      onClick={() => this.openPreviewImg()}
                    ></div>
                  </div>
                </div>
              </div>
              {this.state.isOpen === true && (
                <Lightbox
                  mainSrc={this.state.previewImgURL}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                />
              )}
              <div style={{textAlign:'right'}}>
                <Button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT
                      ? "btn btn-warning"
                      : "btn btn-primary"
                  }
                  type="submit"
                >
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id="manage-user.edit" />
                  ) : (
                    <FormattedMessage id="manage-user.save" />
                  )}
                </Button>{" "}
                <Button
                  color="secondary"
                  className="px-3"
                  onClick={() => {
                    this.toggle();
                  }}
                >
                  Close
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
        <button
          onClick={() => this.handleAddNewUser()}
          className="btn btn-primary add-new px-2"
        >
          <FormattedMessage id="menu.admin.manage-user.add-new" />
        </button>
        <select
          name="role"
          className="form-control classify"
          onChange={(e) => this.handlerOnChangeClassify(e)}
        >
          <option key={1} value="ALL">
            {language === LANGUAGES.VI ? "Tất cả" : "All accounts"}
          </option>
          {roles &&
            roles.length > 0 &&
            roles.map((item, index) => {
              return (
                <option key={index + 1} value={item.keyMap}>
                  {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                </option>
              );
            })}
        </select>
        <TableUserManage
          classify={this.state.classify}
          handlerEditUserFromParent={this.handlerEditUserFromParent}
          action={this.state.action}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoading: state.admin.isLoading,
    arrUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderState: () => dispatch(actions.fetchGenderStart()),
    getPositionState: () => dispatch(actions.fetchPositionStart()),
    getRoleState: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    editUser: (data) => dispatch(actions.editUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // onChangeLanguage: (language)=>(dispatch(setChangeLanguage(language)))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
