import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from "../../../utils";
import {getSearchApi} from '../../../services/userService';
import { Link } from 'react-router-dom';
import './Search.scss'
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
            arrClinic:[],
            arrSpecialty:[],
            arrPost:[],
            arrDoctor:[],
            checkSearch: true,
        }

        this.setTextInputRef = element => {
            this.state.search = element;
        };
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.search!==this.state.search){
            if(this.setTextInputRef.current){
                clearTimeout(this.setTextInputRef.current)
            }
            this.setTextInputRef.current =  setTimeout(async()=>{
                let {arrClinic, arrSpecialty, arrPost, arrDoctor} = this.state;
               let data = await getSearchApi(this.state.search);
               if(data && data.errCode ===0 && data.search.length>0){
               data.search.map((item) => {
                   if(item.detail==='clinic'){
                    arrClinic.push(item)
                }
                if(item.detail==='specialty'){
                    arrSpecialty.push(item)
                }
                if(item.detail==='posts'){
                    arrPost.push(item)
                }
                if(item.detail==='doctor'){
                    arrDoctor.push(item)
                }
               })
               
                this.setState({
                    arrClinic:arrClinic,
                    arrSpecialty:arrSpecialty,
                    arrPost:arrPost,
                    arrDoctor:arrDoctor
                })}
                else{
                    if(this.state.search===''){
                        this.setState({
                            checkSearch: true
                        })
                    }else{
                        this.setState({
                            checkSearch: false
                        })
                    }
                }
            },800)
            
        }
    }
    handleSearch=(name)=>{
        this.setState({
            search: name,
            arrClinic:[],
            arrSpecialty:[],
            arrPost:[],
            arrDoctor:[],
            checkSearch: true
        });

    }
    render() {
        let {arrClinic, arrSpecialty, arrPost, search, checkSearch, arrDoctor}= this.state
        let {language}= this.props
        return (
            <div className="banner-search">
                <div className="search">
                  <i className="fa fa-search"></i>
                  <input
                    onChange={(e)=>this.handleSearch(e.target.value)}                  
                    type="search"
                    value={search}
                    placeholder={
                      this.props.language === LANGUAGES.EN
                        ? "Search"
                        : "Tìm kiếm"
                    }
                  />
                </div>
                <div className="connect-search">
                    <div className="live-search">
                        {checkSearch ?"":<p className='no-result'>{language ===LANGUAGES.VI?'Không có kết quả được tìm thấy!':'No result is found!'}</p>}
                        {arrDoctor && arrDoctor.length>0 && 
                        (   <>
                            <b className='name-main'>{language ===LANGUAGES.VI?'Bác sĩ':'Doctor'}</b>
                            {arrDoctor.map((item, index)=>{
                                return <Link to={`/detail-${item.detail}/${item.id}`} key={index} className="link-search">
                                    <div className='img-medical doctor'
                                        style={{backgroundImage: `url(${item.image})`}}
                                    />
                                    <p>{`${item.lastName} ${item.firstName}`}</p>

                                </Link>
                            })}
                            </>
                            
                        )
                        }
                        {arrClinic && arrClinic.length>0 && 
                        (   <>
                            <b className='name-main'>{language ===LANGUAGES.VI?'Cơ sở y tế':'Clinic'}</b>
                            {arrClinic.map((item, index)=>{
                                return <Link to={`/detail-${item.detail}/${item.id}`} key={index} className="link-search">
                                    <div className='img-medical'
                                        style={{backgroundImage: `url(${item.image})`}}
                                    />
                                    <p>{item.name}</p>

                                </Link>
                            })}
                            </>
                            
                        )
                        }

                        {arrSpecialty && arrSpecialty.length>0 && 
                        ( <>
                            <b className='name-main'>{language ===LANGUAGES.VI?'Chuyên khoa':'Specialty'}</b>
                            {arrSpecialty.map((item, index)=>{
                                return <Link to={`/detail-${item.detail}/${item.id}`} key={index} className="link-search">
                                    <div className='img-medical'
                                        style={{backgroundImage: `url(${item.image})`}}
                                    />
                                    <p>{item.name}</p>
                                </Link>
                            })}
                            </>
                        )
                        }

                        {arrPost && arrPost.length>0 && 
                        (   <>
                            <b className='name-main'>{language ===LANGUAGES.VI?'Bài viết':'Posts'}</b>
                            {arrPost.map((item, index)=>{
                                return <Link to={`/detail-${item.detail}/${item.id}`} key={index} className="link-search">
                                    <div className='img-medical'
                                        style={{backgroundImage: `url(${item.image})`}}
                                    />
                                    <p>{item.name}</p>
                                </Link>
                            })}
                            </>
                            
                        )
                        }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
