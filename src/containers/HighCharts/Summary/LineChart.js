import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment';
import { Button, ButtonGroup } from '@material-ui/core';

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format('DD/MM/YYYY'));

  return {
    chart: {
      height: 500,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: categories,
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
        name: 'Tổng Ca nhiễm',
        data: data.map((item) => item.Confirmed),
      },
      {
        name: 'Tổng Ca khỏi',
        data: data.map((item) => item.Active),
      },
      {
        name: 'Tổng Ca tử vong',
        data: data.map((item) => item.Deaths  ),
      },
    ],
  };
};

export default function LineChart({ data }) {
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState('all');
  console.log({ data });

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case 'all':
        customData = data;
        break;
      case '365':
          customData = data.slice(Math.max(data.length - 365, 1));
          break;
      case '30':
        customData = data.slice(Math.max(data.length - 30, 1));
        break;
      case '7':
        customData = data.slice(Math.max(data.length - 7, 1));
        break;

      default:
        customData = data;
        break;
    }

    setOptions(generateOptions(customData));
  }, [data, reportType]);

  return (
    <>
      <ButtonGroup
        size='small'
        aria-label='small outlined button group'
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          color={reportType === 'all' ? 'secondary' : ''}
          onClick={() => setReportType('all')}
        >
          Tất cả
        </Button>
        <Button
          color={reportType === '365' ? 'secondary' : ''}
          onClick={() => setReportType('365')}
        >
          365 ngày
        </Button>
        <Button
          color={reportType === '30' ? 'secondary' : ''}
          onClick={() => setReportType('30')}
        >
          30 ngày
        </Button>
        <Button
          color={reportType === '7' ? 'secondary' : ''}
          onClick={() => setReportType('7')}
        >
          7 ngày
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import moment from 'moment';

// class LineChart extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             options:{},
//         }
//     }
//     componentDidMount(){
       
//     }
//     componentDidUpdate(prevProps, prevState, snapshot) {
//       let {data} = this.props;
//       let result = []
//       console.log('s',data)
//       if(prevProps.data !== data){
//         result = data.map((item, index)=>{
//           return item.Confirmed
//         })
//       }
//       let options = {
//         title: {
//             text: 'My chart'
//           },
//           series: [{
//             data: result
//           }]
//       }
//         // console.log('2',option)
//         this.setState({options}); 
//     }
//     render() {
//         let {options} = this.state;
//         console.log("1",options);
//         return (
//             <div>
//               <HighchartsReact
//                 highcharts={Highcharts}
//                 options={options}
//               />
//             </div>
            
//         );
//     }

// }

// const mapStateToProps = state => {
//     return {
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LineChart);
