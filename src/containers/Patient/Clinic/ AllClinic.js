import * as React from "react";
import { useState, useEffect } from "react";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import "./AllClinic.scss";
import { getAllClinic } from "../../../services/userService";
import { Link } from "react-router-dom";
const AllClinic = () => {
  const [data, setData] = useState([]);
  const [numberAll, setNumberAll] = useState(0);
  const [numberShowUser, setNumberShowUser] = useState(12);
  const [selected, setSelected] = useState();
  const [arrShow, setAllShow] = useState([]);
  useEffect(() => {
    getScheduleAll();
  }, []);
  const getScheduleAll = async () => {
    let res = await getAllClinic();
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
          <p> Cơ sở y tế</p>
        </div>
        <div className="background">
          <img
            src="https://www.mayoclinic.org/-/media/kcms/gbs/patient-consumer/images/2019/10/28/15/57/roch-methodist-1520x600-1227506-01r.jpg"
            alt="brg"
          />
        </div>
        <div className="center">
          <div className="top">
            <h4>Danh sách sơ sở y tế</h4>
          </div>
          <div className="list container">
            <div className="row">
              {arrShow.map((item) => (
                <div className="col-3 clinic" key={item.id}>
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
        {/* <h2>Liên hệ với chúng tôi</h2>
        <div className="lien-he"
            style={{
                backgroundImage: `url(https://viettelconstruction.com.vn/wp-content/uploads.bak/2021/03/slide-3-copy.jpg)`,
              }}
        >
            <h4>Liên hệ với chúng tôi qua đường dây no</h4>
        </div> */}
      </div>
      <HomeFooter/>
    </>
  );
};

export default AllClinic;
