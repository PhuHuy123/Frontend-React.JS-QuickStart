import * as React from "react";
import { useState, useEffect } from "react";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
// import "./AllClinic.scss";
import { getAllSpecialty } from "../../../services/userService";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
const  AllSpecialty = () => {
  const [data, setData] = useState([]);
  const [numberAll, setNumberAll] = useState(0);
  const [numberShowUser, setNumberShowUser] = useState(12);
  const [selected, setSelected] = useState();
  const [arrShow, setAllShow] = useState([]);
  const isTablet = useMediaQuery({ query: '(max-width: 991px)' })
  const isMobi = useMediaQuery({ query: '(max-width: 768px)' })
  const isIphone = useMediaQuery({ query: '(max-width: 414px)' })
  useEffect(() => {
    getScheduleAll();
  }, []);
  const getScheduleAll = async () => {
    let res = await getAllSpecialty();
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
  const handlerNextPage = (number) => {
    let end = numberShowUser * number;
    setSelected(number);
    setAllShow(data.slice(end - numberShowUser, end));
  };
  return (
    <>
      <HomeHeader />
      <div className="all-clinic">
        <div className="top container">
          <Link to='/home'><p>Trang chủ </p></Link>
            /
          <p> Chuyên khoa</p>
        </div>
        <div className={isTablet? isMobi? isIphone?'background-iphone':'background-mobi':'background-tablet': 'background'}>
          <img
            src="https://tamanhhospital.vn/wp-content/uploads/2021/06/chuyen-khoa-benh-vien-tam-anh.jpg"
            alt="brg"
          />
        </div>
        <div className="center">
          <div className="top">
            <h4>Danh sách chuyên khoa</h4>
          </div>
          <div className="list container">
            <div className="row">
              {arrShow.map((item) => (
                <div className={isTablet? isMobi? isIphone?'col-12 clinic':'col-6 clinic':'col-4 clinic': 'col-3 clinic'} key={item.id}>
                  <Link to={`/detail-clinic/${item.id}`}>
                    <div className="ct-clinic">
                      <div
                        className="image"
                        style={{
                          backgroundImage: `url(${
                            item.image ? item.image : ""
                          })`,
                        }}
                      ></div>
                      <p>{item.name}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="paging">{createButtonPage(numberAll)}</div>
          </div>
        </div>
      </div>
      <HomeFooter/>
    </>
  );
};

export default  AllSpecialty;
