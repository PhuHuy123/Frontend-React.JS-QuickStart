import * as React from "react";
import { useState, useEffect } from "react";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./AllDoctor.scss";
import { getAllDoctors } from "../../../services/userService";
import { Link } from "react-router-dom";
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { useMediaQuery } from 'react-responsive'
const AllDoctor = () => {
  const [data, setData] = useState([]);
  const [numberAll, setNumberAll] = useState(0);
  const [numberShowUser, setNumberShowUser] = useState(8);
  const [selected, setSelected] = useState();
  const [arrShow, setAllShow] = useState([]);
  const isTablet = useMediaQuery({ query: '(max-width: 991px)' })
  const isMobi = useMediaQuery({ query: '(max-width: 768px)' })
  const isIphone = useMediaQuery({ query: '(max-width: 414px)' })
  useEffect(() => {
    getScheduleAll();
  }, []);
  const getScheduleAll = async () => {
    let res = await getAllDoctors();
    if (res && res.errCode === 0) {
      setData(res.data);
      setAllShow(res.data.slice(0, numberShowUser));
      setNumberAll(res.data.length);
    }
  };
  const createButtonPage = (number) => {
    let arr = [];
    let btn = Math.ceil(number / numberShowUser);
    for (let i = 1; i <= btn; i++) {
      arr.push(i);
    }
    return arr.map((item) => {
      return (
        <button
          key={item}
          className={selected === item ? "selected" : ""}
          onClick={() => handlerNextPage(item)}
        >
          {item}
        </button>
      );
    });
  };
  const handlerNextPage = (item) => {
    let end = numberShowUser * item;
    setSelected(item);
    console.log('data', data);
    setAllShow(data.slice(end - numberShowUser, end));
  };
  return (
    <>
      <HomeHeader />
      <div className="all-clinic">
        <div className="top container">
          <Link to='/home'><p>Trang chủ </p></Link>
          /
          <p>Bác sĩ</p>
        </div>
        <div className={isTablet? isMobi? isIphone?'background-iphone':'background-mobi':'background-tablet': 'background'}>
          <img
            src="https://tamanhhospital.vn/wp-content/uploads/2020/12/banner-chuyen-gia-bac-si-desk.jpg"
            alt="brg"
          />
        </div>
        <div className="center">
          <div className="top">
            <h4>Danh sách bác sĩ</h4>
          </div>
          <div className="list container">
            <div className="row">
              {arrShow &&
                arrShow.length > 0 &&
                arrShow.map((item, index) => {
                  return (
                    <div className="each-doctor" key={index}>
                      <div className="dt-content-left">
                        <div className="profile-doctor">
                          <ProfileDoctor
                            doctorId={item.id}
                            isShowMarkdown={true}
                            isShowLinkDetail={true}
                            isShowPrice={false}
                            // dataTime ={dataTime}
                          />
                        </div>
                      </div>
                      <div className="dt-content-right">
                        <div className="doctor-schedule">
                          <DoctorSchedule doctorIdFromParent={item.id} />
                        </div>
                        <div className="doctor-extraInfo">
                          <DoctorExtraInfo doctorIdFromParent={item.id} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="paging">{createButtonPage(numberAll)}</div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  );
};

export default AllDoctor;
