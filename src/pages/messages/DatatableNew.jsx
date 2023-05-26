import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import "./datatablenew.scss";
import Empty from "./svg/empty.svg";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import Back from "./svg/back.svg";
import Forward from "./svg/forward.svg";

function DatatableNew({ data, statues }) {
  const [page, setPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const tableRef = useRef();

  const handleChangeForward = () => {
    var total = data.length;
    setPage((pre) =>
      pre === 0 || total - 7 > 0 ? pre + 7 : pre + total - pre
    );
    setPageNumber((pre) => pre + 1);
  };
  const handleChangeBackward = () => {
    var total = data.length;
    setPage((pre) => pre - 7);
    setPageNumber((pre) => pre - 1);
  };
  return (
    <div className="tableParent">
      <TableContainer
        ref={tableRef}
        stickyHeader
        className="tableContainer"
        component={Paper}
      >
        <Table
          ref={tableRef}
          sx={{ minWidth: 500 }}
          aria-label="enhanced table"
        >
          <TableHead style={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell className="headerCell" width={"5%"} align="center">
                SIRA NO
              </TableCell>
              <TableCell width={"10%"} className="headerCell" align="center">
                TALEP ID
              </TableCell>
              <TableCell width={"10%"} className="headerCell" align="center">
                TARİH/ZAMAN
              </TableCell>
              <TableCell width={"10%"} className="headerCell" align="center">
                DURUM
              </TableCell>
              <TableCell width={"10%"} className="headerCell" align="center">
                Son Yanıtlayan
              </TableCell>
              <TableCell width={"10%"} className="headerCell" align="center">
                KONU
              </TableCell>
              <TableCell width={"10%"} className="headerCell" align="center">
                ÖNCELİK
              </TableCell>
              <TableCell
                width={"10%"}
                className="headerCell"
                align="center"
              ></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0 &&
              data.slice(page, page + 7).map((row, id) => {
                return (
                  <TableRow
                    className="tableRowDataContainer"
                    key={id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      width={"10%"}
                      className="textCell"
                      align="center"
                    >
                      {data.findIndex((i) => i.id === row.id) + 1}
                    </TableCell>
                    <TableCell
                      width={"10%"}
                      className="textCell"
                      align="center"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell
                      width={"10%"}
                      className="textCell"
                      align="center"
                    >
                      {new Date(
                        row.createdAt.seconds * 1000
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      width={"10%"}
                      className="textCell"
                      id="answer"
                      align="center"
                    >
                      <div className={`${row.statue === 0 ? "grey" : "green"}`}>
                        {statues[row.statue]}
                      </div>
                    </TableCell>
                    <TableCell
                      width={"10%"}
                      className="textCell"
                      align="center"
                    >
                      {row.lastResponse === auth.currentUser.uid
                        ? "Siz"
                        : "Online Keşif"}
                    </TableCell>
                    <TableCell
                      width={"10%"}
                      className="textCell dropdownable"
                      align="center"
                    >
                      {row.subject}
                    </TableCell>

                    <TableCell id="actionCell" align="center">
                      <span className={`statue ${row.priority}`}>
                        {row.priority}
                      </span>
                    </TableCell>
                    <TableCell id="actionCell" align="center">
                      <Link className="Link" to={`${row.id}`} state={row}>
                        <div className="viewButton"></div>
                        Görüntüle
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <div className="pagination">
          <div className="left">
            Gösterilen {page + 1}-{data.length > 7 ? page + 7 : data.length} /
            Toplam : {data.length}
          </div>
          <div className="right">
            <button
              disabled={page === 0 ? true : false}
              onClick={handleChangeBackward}
            >
              <img src={Back} alt="" />
            </button>
            <span>{pageNumber}</span>
            <button
              disabled={data.length - page < 7 ? true : false}
              onClick={handleChangeForward}
            >
              <img src={Forward} alt="" />
            </button>
          </div>
        </div>
      </TableContainer>

      {data.length < 1 && (
        <div className="empty-area">
          <p className="empty-text">
            Talebiniz Bulunmamaktadır. İsterseniz Yeni Talep Oluşturun
          </p>
          <img src={Empty} alt="" className="empty-img" />
          <NavLink to="/mesajlarim/Yeni-Destek-Talebi" className="new-button">
            Yeni Destek Talebi Oluştur
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default DatatableNew;
