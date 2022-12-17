import React, { Component } from 'react';
import { connect } from 'react-redux';
import CountrySelector from './CountrySelector';
import Highlight from './Highlight/Highlight.js';
import Summary from './Summary/Summary';
import {getCountriesCovid19, getReportByCountry} from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './HighChart.scss';
import Loading from '../Loading'

class HighChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            selectedCountryId: 'Viet Nam',
            report: [],
            isLoading: true,
        }
    }
    async componentDidMount(){
        let {countries, selectedCountryId} = this.state; 
        let res = await getCountriesCovid19()
        const {Slug} = res.find((item)=>item.Country=== selectedCountryId);
        let Country = await getReportByCountry(Slug);
        this.setState({
            isLoading: false
        })
        Country.pop();
        this.setState({
            countries: res,
            report:Country,
        })
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        let {countries, selectedCountryId} = this.state;
        if(prevState.selectedCountryId !== selectedCountryId){
            let {Slug} =  countries.find((item)=>item.Country=== selectedCountryId);
            let res = await getReportByCountry(Slug);
                res.pop();
            this.setState({
                report:res,
            })
        }
    }
    handleOnChange = async(e)=>{    
        let {countries, selectedCountryId} = this.state;
        this.setState({
            selectedCountryId:e,
        })
        
    }
    render() {
        let {countries, report, selectedCountryId, isLoading} = this.state
        return (
            <>
                {isLoading && <Loading/>}
                <HomeHeader/>
                <div className="high-chart-covid">
                    <CountrySelector
                        countries={countries}
                        handleOnChange={this.handleOnChange}
                        value={selectedCountryId}
                    />
                    <Highlight report={report}/>
                    <Summary report={report}/>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HighChart);
