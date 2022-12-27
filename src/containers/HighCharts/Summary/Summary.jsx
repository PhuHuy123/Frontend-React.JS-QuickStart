import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineChart from './LineChart';
import Grid from '@material-ui/core/Grid';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
       
    }
    render() {
        let {report} = this.props;
        return (
            <div style={{ height: '500px', marginTop: 10 }}>
                <Grid container spacing={3}>
                    <Grid item sm={8} xs={12}>
                    <LineChart data={report} />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                    </Grid>
                </Grid>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
