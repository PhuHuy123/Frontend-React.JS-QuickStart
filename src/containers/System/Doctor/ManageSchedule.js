import React, { Component } from 'react';
import { connect } from "react-redux";

class ManageSchedule extends Component {
    render() {
        return (
            <>
               <div className="">ManageSchedule
                <h1>Doctor</h1>
               </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
