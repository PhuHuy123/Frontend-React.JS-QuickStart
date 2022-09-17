import { CardContent, Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HighlightCard from './HighlightCard';

class Highlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            summary:[]
        }
    }
    componentDidMount(){
        
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        let {report} = this.props;
        if(prevProps.report !== report){
        let data =report && report.length ? report[report.length-1] : [];

        let summary = [
            {
                title: 'Số ca nhiểm',
                count: data.Confirmed,
                type: 'confirmed',
            },
            {
                title: 'Khỏi',
                count: data.Active,
                type: 'recovered',
            },
            {
                title: 'Tử vong',
                count: data.Deaths,
                type: 'death',
            }
        ]
        this.setState({
            summary:summary
        })
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Highlight);
