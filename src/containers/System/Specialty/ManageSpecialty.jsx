import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { createNewSpecialty, editSpecialty } from "../../../services/userService";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      imageBase64: "",
      contentMarkdown: "",
      contentHTML: "",
      previewImgURL: "",
    };
  }

  async componentDidMount() {
    if(this.props.history.location.state){
      let data=this.props.history.location.state
      this.setState({
        id: data.id,
        name: data.name,
        contentMarkdown: data.descriptionMarkdown,
        contentHTML: data.descriptionHTML,
        previewImgURL: data.image,
      })
    }
  }
  handlerOnChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handlerOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectURL = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectURL,
        imageBase64: base64,
      });
    }
  };
  handlerSaveNewSpecialty = async () => {
    console.log("Saving new specialty", this.state);
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new specialty success!");
      this.setState({
        name: "",
        imageBase64: "",
        contentMarkdown: "",
        contentHTML: "",
        previewImgURL: "",
      });
    } else {
      toast.error("Error creating new specialty!");
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  openPreviewImg = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handlerEditSpecialty=async()=>{
    let res = await editSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Update Specialty success!");
      this.setState({
        name: "",
        imageBase64: "",
        contentMarkdown: "",
        contentHTML: "",
        previewImgURL: "",
      });
      if (this.props.history) {
        this.props.history.push(`/system/manage-specialty`);
      }
    } else {
      toast.error("Error Update Specialty!");
    }
  }
  render() {
    let { language, history } = this.props;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý chuyên khoa</div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên chuyên khoa</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(e) => this.handlerOnChangeInput(e, "name")}
            />
          </div>
          <div className="col-6 form-group image">
            <label>Ảnh chuyên khoa</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(e) => this.handlerOnChangeImage(e)}
            />
            <div
              className="preview-image-manage"
              style={{
                backgroundImage: `url("${this.state.previewImgURL}")`,
              }}
              onClick={() => this.openPreviewImg()}
            ></div>
          </div>
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
          <div className="col-12">
            <MdEditor
              style={{ height: "390px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <div className="col-12">
          {history.location.state?
            <button
              className="btn-save-specialty"
              onClick={() => this.handlerEditSpecialty()}
            >
              Update
            </button>:
            <button
              className="btn-save-specialty"
              onClick={() => this.handlerSaveNewSpecialty()}
            >
              save
            </button>
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
