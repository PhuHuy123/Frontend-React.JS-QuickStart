import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class CountrySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
       
    }
    render() {
        let {countries, value} = this.props;
        console.log(value);
        return (
            <FormControl>
                <InputLabel htmlFor='' shrink>
                    Bác sĩ
                </InputLabel>
                <NativeSelect 
                    value={value}
                    onChange={(e)=>this.props.handleOnChange(e.target.value)}
                    // inputProps={{
                    //     name: 'country',
                    //     id: 'country-select',
                    // }}

                >
                    { countries.map((item) =>{
                        return <option key={item.ISO2.toLowerCase()}>{item.Country}</option>
                    })

                    }
                </NativeSelect>
                <FormHelperText>Lựa chọn bác sĩ</FormHelperText>
            </FormControl>
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

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelector);
