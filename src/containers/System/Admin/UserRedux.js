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
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            image: '',
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
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr:arrGenders,
                gender: arrGenders && arrGenders.length>0 ? arrGenders[0].key :'',
            })
        }
        // position
        if(prevProps.positionRedux!==this.props.positionRedux){
            let arrPositions =this.props.positionRedux;
            this.setState({
                positionArr:arrPositions,
                position: arrPositions && arrPositions.length>0 ? arrPositions[0].key :'',
            
            })
        }
        // role
        if(prevProps.roleRedux!==this.props.roleRedux){
            let arrRoles= this.props.roleRedux;
            this.setState({
                roleArr:arrRoles,
                role: arrRoles && arrRoles.length>0 ? arrRoles[0].key :'',
            })
        }
    }
    handlerOnChangeImage = (event)=>{
        let data = event.target.files;
        let file = data[0];
        if(file){
            let objectURL = URL.createObjectURL(file);
            this.setState({
                previewImgURL:objectURL,
                image: file
            })
        }
    }
    openPreviewImg =()=>{
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }
    handlerOnChangeInput=(input, id)=>{
        let copyState = {...this.state};
        copyState[id]= input.target.value; 
        this.setState({
            ...copyState
        })
    }
    checkValidateInput =()=>{
        let isValid = true;
        let arrInput = ['email','password', 'firstName', 'lastName', 'address', 'phoneNumber']
        for(let i=0; i<arrInput.length; i++){
            if(!this.state[arrInput[i]]){
                isValid = false;
                alert("Bạn chưa nhập: " + arrInput[i])
                break;
            }
        }
        return isValid;
    }
    handlerSaveUser=()=>{
        if(this.checkValidateInput()===false) return;
        
        // = true thi goi API
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
        });
    }
    render() {
        const {language} = this.props;
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let {email, password, firstName, lastName, address, phoneNumber, 
            gender, position, role, image,}=this.state;
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
                            <input type="email" className="form-control" name="email" placeholder="Email"
                                value={email}
                                onChange={(e)=>this.handlerOnChangeInput(e, 'email')}
                            />
                        </div>
                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.password"/></label>
                            <input type="password" className="form-control" name="password" placeholder="Password"
                                value={password}
                                onChange={(e)=>this.handlerOnChangeInput(e, 'password')}
                            />
                        </div>

                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.first-name"/></label>
                            <input type="text" className="form-control" name="firstName" placeholder="First name"
                                value={firstName}
                                onChange={(e)=>this.handlerOnChangeInput(e, 'firstName')}
                            />
                        </div>
                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.last-name"/></label>
                            <input type="text" className="form-control" name="lastName" placeholder="Last name"
                                value={lastName}
                                onChange={(e)=>this.handlerOnChangeInput(e, 'lastName')}
                            />
                        </div>

                        <div className="col-10 mt-2">
                            <label><FormattedMessage id="manage-user.address"/></label>
                            <input type="text" className="form-control" name="address" placeholder="Address"
                                value={address}
                                onChange={(e)=>this.handlerOnChangeInput(e, 'address')}
                            />
                        </div>
                        <div className="col-4 mt-2">
                            <label><FormattedMessage id="manage-user.gender"/></label>
                            <select name="gender" className="form-control"
                                onChange={(e)=>this.handlerOnChangeInput(e, 'gender')}
                            >
                                {genders && genders.length > 0 &&
                                    genders.map((item, index)=>{
                                        return (
                                            <option key={index} value={item.key}>
                                                {language===LANGUAGES.VI?item.valueVi:item.valueEn}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3 mt-2">
                            <label><FormattedMessage id="manage-user.position"/></label>
                            <select name="position" className="form-control"
                                onChange={(e)=>this.handlerOnChangeInput(e, 'position')}
                            >
                                {positions && positions.length > 0 &&
                                    positions.map((item, index)=>{
                                        return (
                                            <option key={index} value={item.key}>
                                                {language===LANGUAGES.VI?item.valueVi:item.valueEn}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3 mt-2">
                            <label><FormattedMessage id="manage-user.role"/></label>
                            <select name="role" className="form-control"
                                onChange={(e)=>this.handlerOnChangeInput(e, 'role')}
                            >
                                {roles && roles.length > 0 &&
                                    roles.map((item, index)=>{
                                        return (
                                            <option key={index} value={item.key}>
                                                {language===LANGUAGES.VI?item.valueVi:item.valueEn}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-5 mt-2">
                            <label><FormattedMessage id="manage-user.phone"/></label>
                            <input type="text" className="form-control" name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e)=>this.handlerOnChangeInput(e, 'phoneNumber')}
                            />
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
                            <button type="submit" className="btn btn-primary mt-3"
                                onClick={()=>{this.handlerSaveUser()}}
                            >
                                <FormattedMessage id="manage-user.save"/>
                            </button>
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
        getRoleState: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // onChangeLanguage: (language)=>(dispatch(setChangeLanguage(language)))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
