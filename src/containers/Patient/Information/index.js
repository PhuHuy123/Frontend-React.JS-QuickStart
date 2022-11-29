import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {
    getScheduleDoctorALL
  } from "../../../services/userService";
import { useEffect } from 'react';
import './Info.scss'
export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
useEffect(()=>{
    getScheduleAll()
},[])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getScheduleAll=async()=>{
    let res = await getScheduleDoctorALL(13);
      if(res && res.errCode ===0){
            setData(res.data)

      }
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }} className="table table-bordered mt-3">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className='table-cell'>STT</TableCell>
              <TableCell className='table-cell'>Ngày</TableCell>
              <TableCell className='table-cell'>Thời gian</TableCell>
              <TableCell className='table-cell'>Số người tối đa</TableCell>
              <TableCell className='table-cell'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? 
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => {
                return (
                  <TableRow key={index} hover role="checkbox" tabIndex={-1} >

                        <TableCell >
                        {index}
                        </TableCell>
                        <TableCell >
                        {item.date}
                        </TableCell>
                        <TableCell >
                        {item.maxNumber}
                        </TableCell>
                        <TableCell >
                        {item.maxNumber}
                        </TableCell>
                        <TableCell >
                        <button className='btn btn-info mr-2'
                        >Edit</button>
                        <button className='btn btn-danger'
                        onClick={()=>this.handleDelete(item.id)}
                        >Delete</button>
                        </TableCell>

                  </TableRow>
                );
              })
            : <TableRow hover role="checkbox" tabIndex={-1} >
                <TableCell style={{textAlign: 'center'}}>
                No data
                </TableCell>
            </TableRow>
            }
            
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
