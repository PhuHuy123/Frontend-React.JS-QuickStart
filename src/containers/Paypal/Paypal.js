import React, { Component } from 'react';
import { connect } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import {getProfileDoctorById, postVerifyPaypal} from '../../services/userService';
import { toast } from 'react-toastify';
import './Paypal.scss';
class Paypal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        price: {},
        doctorId:''
    }
}

async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId)
    this.setState({
        price: data.DoctorInfo.priceTypeData,
    })
}
async componentDidUpdate(prevProps, prevState, snapshot) {

}
getInfoDoctor = async(id)=>{
  let result = {}
  if(id){
      let res = await getProfileDoctorById(id);
      if(res && res.errCode === 0){
          result = res.data;
      }
  }
  return result;
}
getVerifyPaypal = async () =>{
  let res = await postVerifyPaypal({
    doctorId: this.props.doctorId,
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    phoneNumber: this.props.phoneNumber,
    email: this.props.email,
    address: this.props.address,
    reason: this.props.reason,
    date: this.props.date,
    selectedGender: this.props.selectedGender.value,
    timeType: this.props.timeType,
    language: this.props.language,
  })
  if(res && res.errCode === 0){
    console.log(res.message)
  }
  else {
    console.log(res.message)
  }
}
  render() {
    let {price} = this.state;
    let {doctorId, firstName, lastName, phoneNumber,email, address, reason, date} = this.props;
    return (
      <>
        <div className="containers-paypal">
            <div className="content-paypal">
              <b>Giá:</b> <span>{price.valueEn}</span>
            </div>
            <div className="content-paypal">
              <b>Giá:</b> <span>{price.valueEn}</span>
            </div>
            <div className="content-paypal">
              <b>Giá:</b> <span>{price.valueEn}</span>
            </div>
            <div className="content-paypal">
              <b>Giá:</b> <span>{price.valueEn}</span>
            </div>
        </div>      
        <PayPalButton
            // amount={price.valueEn}
            amount='1'
            // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
              toast.success("Transaction completed by " + details.payer.name.given_name);
                this.getVerifyPaypal()
                this.props.closePayPal()
            // OPTIONAL: Call your server to save the transaction
            // return fetch("/paypal-transaction-complete", {
            //     method: "post",
            //     body: JSON.stringify({
            //     orderId: data.orderID
            //     })
            // });
            // onCancel={closePayPal}
            }}
            options={{
                clientId: "AVuXlFd4W-LtvDo-bXe2NMWHnZJBwvwEXYbgBckCY56A8CAP5qbsg_rDFTz17u-aLC75SMUYmkR_2QCT",
                currency: 'USD',
            }}
        />
      </>
    );
  }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paypal);
