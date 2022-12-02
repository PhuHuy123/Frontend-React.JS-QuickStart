import { Link } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import './Info.scss'
function Info() {
  return ( 
    <div className="info-container">
      <HomeHeader/>
      <div className="container">
          <div className="row">
            <div className="nav-left col-2">
              <div className="navBar-info">
                <Link to='/info-patient'><p style={{color: 'blue'}}><i className="fa-regular fa-user"></i> Thông tin cá nhân</p></Link>
                <Link to='/single'><p><i className="fa-solid fa-file-invoice"></i> Đơn đặt khám</p></Link>
                <Link to='/history'><p><i className="fa-solid fa-clock-rotate-left"></i> Lịch sử khám</p></Link>
              </div>
            </div>
            <div className="nav-right col-10 row">
                <div className="content-info">
                  <h4>Thông tin cá nhân</h4>
                </div>
            </div>
          </div>
        </div>
    </div>
   );
}

export default Info;