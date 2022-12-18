import * as React from "react";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getAllClinic, deleteClinicById } from "../../../services/userService";
import "./ManageClinic.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Delete from "../../Modal/Delete"
import { reverse } from "lodash";

export default function Clinic() {
  const [page, setPage] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [id, setId] = React.useState();
  const [isModalDelete, setIsModalDelete] = React.useState(false);
  const history = useHistory()
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {
    getScheduleAll();
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getScheduleAll = async () => {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      setData(reverse(res.data));
    }
  };
  const handleModalDelete = (id) =>{
    setId(id)
    setIsModalDelete(true)
  }
  const handleDelete = async()=>{
    setIsModalDelete(false)
    try {
      let res =  await deleteClinicById(id);
      if(res && res.errCode!==0){
          toast.error(res.message);
        }
        else{
          toast.success("Delete successfully!");
          getScheduleAll()
      }
      setId('')
  } catch (e) {
      console.log(e)
  }
  }
  const handleEdit=(data)=>{
    if (history) {
      history.push(`/system/add-clinic`, data);
    }
  }
  return (
    <div className="clinic-table">
        <h3><strong>Quản lý phòng khám</strong></h3>
    <Link to='/system/add-clinic'>
        <button type="button" style={{marginTop:'28px'}} className="btn btn-success form-control col-4">
            <i className="fa-solid fa-plus" style={{marginLeft:'-10px', marginRight:'5px'}}></i>
            Thêm mới
        </button>
    </Link>
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
        className="table table-bordered mt-3"
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell className="table-cell">STT</TableCell>
                <TableCell className="table-cell">Tên phòng khám</TableCell>
                <TableCell className="table-cell">Ảnh phòng khám</TableCell>
                <TableCell className="table-cell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.length > 0 ? (
                data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => {
                    return (
                      <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell><div className='img-slide img-medical'
                                            style={{backgroundImage: `url(${item.image})`}}
                                        /></TableCell>
                        <TableCell>
                          <button className="btn btn-info mr-2" onClick={()=>handleEdit(item)}>Edit</button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleModalDelete(item.id)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell style={{ textAlign: "center" }}>No data</TableCell>
                </TableRow>
              )}
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
      {isModalDelete &&
        <Delete 
        isOpen={isModalDelete}
        closeOpen={()=>setIsModalDelete(false)}
        handelDelete={()=>handleDelete()}
        />
      }
    </div>
  );
}
