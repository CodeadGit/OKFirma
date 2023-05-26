import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { statues } from "../../components/data/statues";

function ListMyJobs({ data }) {
  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          {data.length === 0 ? (
            <div className="empty_text">
              Herhangi bir keşfiniz bulunmamaktadır.
            </div>
          ) : (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Talep ID</TableCell>
                    <TableCell align="right">Ana İstek</TableCell>
                    <TableCell align="right">İstek Tarihi</TableCell>
                    <TableCell align="right">Teklif Zamanı</TableCell>
                    <TableCell align="right">Durum</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.mainWish}</TableCell>

                      <TableCell align="right">
                        {new Date(
                          row.createdAt.seconds * 1000
                        ).toLocaleString()}
                      </TableCell>
                      <TableCell align="right">
                        <div className={`statue ${statues[row.statue].class}`}>
                          {statues[row.statue].label}
                        </div>
                      </TableCell>

                      <TableCell id="actionCell" align="right">
                        <div className="viewButton">
                          <Link to={`${row.id}`} className="link" state={row}>
                            Detay
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
        {/* <RightSideBar/> */}
      </div>
    </>
  );
}

export default ListMyJobs;
