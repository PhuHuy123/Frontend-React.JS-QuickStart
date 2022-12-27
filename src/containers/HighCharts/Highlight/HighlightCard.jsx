import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CardContent, Typography, Card, makeStyles } from '@material-ui/core';
import CountUp from 'react-countup';
import './HighlightCard.scss';

class HighlightCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
    }
    render() {
        let {title, count, type} = this.props;
        return (
            <Card className={type}> 
                <CardContent>
                    <Typography variant='body2' component='p' >
                    {title}
                    </Typography>
                    <Typography variant='body2' component='span' >
                        {/* {count} */}
                        <CountUp end={count} separator=' ' duration={2} />
                    </Typography>
                </CardContent>
            </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(HighlightCard);
