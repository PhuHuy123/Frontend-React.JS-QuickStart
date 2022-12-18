import { CardContent, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HighlightCard from './HighlightCard';
import * as actions from '../../../../store/actions';

class Highlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary:[]
        }
    }
    componentDidMount(){
        this.props.fetchUserRedux()
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        let {data, title} = this.props;
        if(prevProps.data !== data){
            if(title && title === 'account'){
                let confirmed=[];
                let death=[];
                let recovered=[];
                data.map((item)=>{
                    if(item.roleId === 'R2'){
                        confirmed.push(item)
                    }
                    else if(item.roleId === 'R3'){
                        recovered.push(item)
                    }
                    else if(item.roleId === 'R1'){
                        death.push(item)
                    }
                })
            
                let summary = [
                    {
                        title: 'Số bác sĩ',
                        count: confirmed.length,
                        type: 'confirmed',
                    },
                    {
                        title: 'Số người dùng',
                        count: recovered.length,
                        type: 'recovered',
                    },
                    {
                        title: 'Số admin',
                        count: death.length,
                        type: 'death',
                    }
                ]
                this.setState({
                    summary:summary
                })
            }
            if(title && title === 'booking'){
                let confirmed=[];
                let death=[];
                let recovered=[];
                {data && data.length >0 &&
                    data.map((item)=>{
                        if(item.statusId === 'S2'){
                            confirmed.push(item)
                        }
                        else if(item.statusId === 'S3'){
                            recovered.push(item)
                        }
                        else if(item.statusId === 'S0'){
                            death.push(item)
                        }
                    })
                }
            
                let summary = [
                    {
                        title: 'Số lịch đang nhận',
                        count: confirmed.length,
                        type: 'blue',
                    },
                    {
                        title: 'Số lịch khám xong',
                        count: recovered.length,
                        type: 'black',
                    },
                    {
                        title: 'Số lịch đã hủy',
                        count: death.length,
                        type: 'cancel',
                    }
                ]
                this.setState({
                    summary:summary
                })
            }
        }
    }
    render() {
        let {summary} = this.state;
        return (
            <>
             <Grid container spacing={3}>
             {summary.map((data, index) => (
                <Grid item sm={4} xs={12} key={index}>
                <HighlightCard
                    title={data.title}
                    count={data.count}
                    type={data.type}
                />
                </Grid>
            ))}
            </Grid>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        arrUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Highlight);
