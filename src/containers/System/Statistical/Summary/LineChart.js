import React, { Component } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOptions: {},

    };
  }
  componentDidMount() {
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.data!==this.props.data){
      let confirmed = 0;
      let done = 0;
      let cancel = 0;
      const categories = this.props.data.map((item) =>{
        if(item.statusId === 'S2'){
              confirmed++
            }
        if(item.statusId === 'S3'){
          done++
        }
        if(item.statusId === 'S4'){
          cancel++
        }
        return ({
          confirmed: confirmed,
          done: done,
          cancel: cancel,
          date: moment(item.date).format('DD/MM/YYYY'),
        })
      })
    let options = {
      chart: {
        height: 500,
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: categories.map((item) => item.date),
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: null,
        },
        labels: {
          align: 'right',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Số lịch đang nhận',
          data: categories.map((item) => item.confirmed),
        },
        {
          name: 'Số lịch khám xong',
          data: categories.map((item) => item.done),
        },
        {
          name: 'Số lịch đã hủy',
          data: categories.map((item) => item.cancel),
        },
      ],
    }
    this.setState({
      chartOptions:options
    })
    }
  }

  render() {
    const { chartOptions } = this.state;

    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
