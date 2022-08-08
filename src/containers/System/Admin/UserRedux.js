import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr:[],
            positionArr:[],
            roleArr:[],
            previewImgURL:'',
            isOpen: false,
        }
    }

    async componentDidMount() {
        this.props.getGenderState();
        this.props.getPositionState();
        this.props.getRoleState();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // gender
        if(prevProps.genderRedux!==this.props.genderRedux){
            this.setState({genderArr:this.props.genderRedux})
        }
        // position
        if(prevProps.positionRedux!==this.props.positionRedux){
            this.setState({positionArr:this.props.positionRedux})
        }
        // role
        if(prevProps.roleRedux!==this.props.roleRedux){
            this.setState({roleArr:this.props.roleRedux})
        }
    }
    handlerOnChangeImage = (event)=>{
        let data = event.target.files;
        let nameFile = data[0];
        if(nameFile){
            let objectURL = URL.createObjectURL(nameFile);
            this.setState({
                previewImgURL:objectURL
            })
        }
    }
    openPreviewImg =()=>{
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    render() {
        const {language} = this.props;
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        return (
            <>
                <div className="text-center" >User redux</div>
                <div className="container">
                    <div className="row col-10">
                        <h1>{this.props.isLoading?'Loading...':""}</h1>
                        
                        <div className="col-12 mx-3">
                            <h3><FormattedMessage id="manage-user.add"/></h3>
                        </div>
                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.email"/></label>
                            <input type="email" className="form-control" name="email" placeholder="Email"/>
                        </div>
                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.password"/></label>
                            <input type="password" className="form-control" name="password" placeholder="Password"/>
                        </div>

                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.first-name"/></label>
                            <input type="text" className="form-control" name="firstName" placeholder="First name"/>
                        </div>
                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.last-name"/></label>
                            <input type="text" className="form-control" name="lastName" placeholder="Last name"/>
                        </div>

                        <div className="col-10 mt-2">
                            <label><FormattedMessage id="manage-user.address"/></label>
                            <input type="text" className="form-control" name="address" placeholder="Address"/>
                        </div>
                        <div className="col-4 mt-2">
                            <label><FormattedMessage id="manage-user.gender"/></label>
                            <select name="gender" className="form-control">
                                {genders && genders.length > 0 &&
                                    genders.map((item, index)=>{
                                        return (
                                            <option key={index}>{language===LANGUAGES.VI?item.valueVi:item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3 mt-2">
                            <label><FormattedMessage id="manage-user.position"/></label>
                            <select name="position" className="form-control">
                                {positions && positions.length > 0 &&
                                    positions.map((item, index)=>{
                                        return (
                                            <option key={index}>{language===LANGUAGES.VI?item.valueVi:item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3 mt-2">
                            <label><FormattedMessage id="manage-user.role"/></label>
                            <select name="roleId" className="form-control">
                                {roles && roles.length > 0 &&
                                    roles.map((item, index)=>{
                                        return (
                                            <option key={index}>{language===LANGUAGES.VI?item.valueVi:item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.phone"/></label>
                            <input type="text" className="form-control" name="phoneNumber"/>
                        </div>
                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.image"/></label>
                            <br/>
                            <input type="file" 
                                onChange={(e)=>this.handlerOnChangeImage(e)} 
                            />
                            <div className="preview-image"
                                style={{backgroundImage:`url("${this.state.previewImgURL}")`}}
                                onClick={()=>this.openPreviewImg()}
                            ></div>
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary mt-3"><FormattedMessage id="manage-user.save"/></button>
                        </div>
                    </div>
                </div>
                {this.state.isOpen ===true&& (
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderState: () => dispatch(actions.fetchGenderStart()),
        getPositionState: () => dispatch(actions.fetchPositionStart()),
        getRoleState: () => dispatch(actions.fetchRoleStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // onChangeLanguage: (language)=>(dispatch(setChangeLanguage(language)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
