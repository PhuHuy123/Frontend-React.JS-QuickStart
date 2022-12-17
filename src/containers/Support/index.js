import { useState } from "react";
import { FormattedMessage } from "react-intl";
import HomeFooter from "../HomePage/HomeFooter";
import HomeHeader from "../HomePage/HomeHeader";
import {postSupport} from "../../services/userService"
import "./Support.scss";
import { toast } from "react-toastify";

function Support() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [reason, setReason] = useState()
  const [content, setContent] = useState()
  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await postSupport({
      Name: name,
      Email: email,
      PhoneNumber: phone,
      Reason: reason,
      Content: content,
    })
    .then(
      toast.success("Gửi yêu cầu thành công !"),
      setName(''),
      setEmail(''),
      setPhone(''),
      setReason(''),
      setContent(''),
    )
    .catch((error)=>{
      toast.error("Gửi yêu cầu thất bại !")
    }
    )
    console.log(res);
  }
  return (
    <div className="support">
      <HomeHeader />
      <div className="image">
        <p>
          <h4>Chào mừng bạn đến với trang hỗ trợ của website Hope</h4>
        </p>
        <p>Bạn cần hỗ trợ tư vấn trực tiếp?</p>
        <p>
          Hãy liên hệ với chúng tôi qua Hotline: <strong>044 7700 6886</strong>
        </p>
        <p>Hoặc bạn có thể điền thông tin vào ô bên dưới</p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="body">
          <div className="row">
            <div className="col-12 form-group">
              <label>Họ và tên</label>
              <input
                required
                type="text"
                className="form-control inv"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-12 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.phoneNumber" />
              </label>
              <input
                required
                type="tel"
                pattern="[0]{1}[0-9]{9}"
                className="form-control inv"
                value={phone}
                onChange={(e) =>setPhone(e.target.value)}
              />
            </div>
            <div className="col-12 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.email" />
              </label>
              <input
                required
                type="email"
                className="form-control inv"
                value={email}
                onChange={(e) =>setEmail(e.target.value)}
              />
            </div>
            <div className="col-12 form-group">
              <label>Lý do</label>
              <input
                required
                className="form-control"
                value={reason}
                onChange={(e) =>setReason(e.target.value)}
              />
            </div>
            <div className="col-12 form-group">
              <label>Nội dung</label>
              <textarea
                required
                className="form-control"
                value={content}
                onChange={(e) =>setContent(e.target.value)}
              />
            </div>
            <div className="col-12 form-group">
              <button className="btn btn-warning" type="submit">
                <b>Gửi</b>
              </button>
            </div>
          </div>
        </div>
      </form>
      <HomeFooter/>
    </div>
  );
}

export default Support;
