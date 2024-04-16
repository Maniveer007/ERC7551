import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./transaction.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0d0d0d",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(tx, method, source, destination, status, create) {
  return { tx, method, source, destination, status, create };
}

const rows = [
  createData(
    "6F2E1575...AAEC58CC",
    "217.47 axlUSDC",
    "terra1...gmz227uw",
    "osmo1xrd5gu...5mmrq4wd",
    "Received",
    "8 minutes ago"
  ),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const Transfer = () => {
  return (
    <div className="transfer_container">
      <div className="transfer_container_upper">
        <div className="transfer_container_upper_first">
          <div className="transfer_container_upper_first_first">
            <div className="transfer_container_upper_svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                id="Nodebitcoin"
              >
                <path
                  d="M35.3 49.4c-.2 0-.4-.1-.5-.4l-2.3-8.9c-.1-.3.1-.5.4-.6.3-.1.5.1.6.4l2.3 8.9c.1.3-.1.5-.4.6h-.1zm-22-10.6c-.2 0-.4-.1-.5-.3-.1-.3 0-.5.3-.6L23.9 34c.3-.1.5 0 .6.3s0 .5-.3.6l-10.8 3.9c0-.1 0 0-.1 0zm26.4-9.5c-.2 0-.4-.1-.5-.3-.1-.3 0-.5.3-.6l5.3-1.9c.3-.1.5 0 .6.3.1.3 0 .5-.3.6l-5.2 1.9h-.2zm-2.1 19.5c-.2 0-.4-.1-.5-.4l-2.3-8.9c-.1-.3.1-.5.4-.6.3-.1.5.1.6.4l2.3 8.9c.1.3-.1.5-.4.6h-.1zm-8.8-24.2c-.2 0-.4-.1-.5-.4l-2.2-8.4c-.1-.3.1-.5.4-.6.3-.1.5.1.6.4l2.2 8.4c.1.3-.1.5-.4.6h-.1zM12.7 36.5c-.2 0-.4-.1-.5-.3-.1-.3 0-.5.3-.6l11-3.9c.3-.1.5 0 .6.3.1.3 0 .5-.3.6l-11 3.9h-.1zM31.1 24c-.2 0-.4-.1-.5-.4l-2.2-8.4c-.1-.3.1-.5.4-.6.3-.1.5.1.6.4l2.2 8.4c.1.3-.1.5-.4.6h-.1zm7.4 3.2c-.2 0-.4-.1-.5-.3-.1-.3 0-.5.3-.6l5.6-2c.3-.1.5 0 .6.3.1.3 0 .5-.3.6l-5.6 2h-.1zm12.4 14.2h-.2l-11.4-5.1c-.2-.1-.4-.4-.2-.6.1-.2.4-.4.7-.2l10.9 4.9c.1-.4.3-.8.5-1.2l-11-5c-.2-.1-.4-.4-.2-.6.1-.2.4-.4.7-.2l11.3 5 .3.3c0 .1 0 .3-.1.4-.4.6-.7 1.2-.8 1.9 0 .1-.1.3-.3.3-.1.1-.2.1-.2.1z"
                  fill="#ffffff"
                  class="color000000 svgShape"
                ></path>
                <path
                  d="M38.1 62.1c-1.4 0-2.7-.4-3.9-1.2-1.6-1.1-2.7-2.7-3.1-4.5-.4-1.9 0-3.8 1-5.4 1.1-1.6 2.7-2.7 4.5-3.1 1.9-.4 3.8 0 5.4 1 1.6 1.1 2.7 2.7 3.1 4.5.4 1.9 0 3.8-1 5.4-1.1 1.6-2.7 2.7-4.5 3.1-.5.1-1 .2-1.5.2zm.1-13.4c-.4 0-.8 0-1.3.1-1.6.3-3 1.3-3.9 2.7s-1.2 3-.9 4.6c.3 1.6 1.3 3 2.7 3.9 1.4.9 3 1.2 4.6.9s3-1.3 3.9-2.7c.9-1.4 1.2-3 .9-4.6-.3-1.6-1.3-3-2.7-3.9-1-.6-2.1-1-3.3-1zM26.1 16.3h-.7c-3.9-.4-6.8-3.9-6.4-7.9.4-3.9 3.9-6.8 7.9-6.4 3.9.4 6.8 3.9 6.4 7.9-.2 1.9-1.1 3.6-2.6 4.8-1.4 1-2.9 1.6-4.6 1.6zm0-13.4c-3.1 0-5.8 2.4-6.1 5.5-.3 3.4 2.1 6.4 5.5 6.8 1.6.2 3.2-.3 4.5-1.4 1.3-1 2.1-2.5 2.2-4.2.3-3.4-2.1-6.4-5.5-6.8-.2.1-.4.1-.6.1zm31.2 46.6c-4 0-7.2-3.2-7.2-7.2 0-.6.1-1.1.2-1.6.1-.3.3-.4.6-.4.3.1.4.3.4.6-.1.5-.2.9-.2 1.4 0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2 0-3.4-2.8-6.2-6.2-6.2-2.1 0-4 1-5.2 2.8-.2.2-.5.3-.7.1-.2-.2-.3-.5-.1-.7 1.3-2 3.6-3.2 6-3.2 3.9 0 7.2 3.2 7.2 7.2s-3.2 7.2-7.2 7.2zm-6.6-18.8c-4 0-7.2-3.2-7.2-7.2s3.2-7.2 7.2-7.2 7.2 3.2 7.2 7.2c-.1 4-3.3 7.2-7.2 7.2zm0-13.4c-3.4 0-6.2 2.8-6.2 6.2 0 3.4 2.8 6.2 6.2 6.2s6.2-2.8 6.2-6.2c-.1-3.4-2.8-6.2-6.2-6.2zm-44 28.6c-4 0-7.2-3.2-7.2-7.2s3.2-7.2 7.2-7.2 7.2 3.2 7.2 7.2-3.3 7.2-7.2 7.2zm0-13.3c-3.4 0-6.2 2.8-6.2 6.2S3.3 45 6.7 45s6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm25.3 8c-4.8 0-8.8-3.9-8.8-8.8 0-4.8 3.9-8.8 8.8-8.8 4.8 0 8.8 3.9 8.8 8.8-.1 4.8-4 8.8-8.8 8.8zM32 24c-4.3 0-7.8 3.5-7.8 7.8s3.5 7.8 7.8 7.8 7.8-3.5 7.8-7.8S36.2 24 32 24z"
                  fill="#ffffff"
                  class="color000000 svgShape"
                ></path>
                <path
                  d="M32.2 32.3h-2.6c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2.6c1.1 0 2-.9 2-2s-.9-2-2-2h-3.6c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3.6c1.6 0 3 1.4 3 3s-1.3 3-3 3z"
                  fill="#ffffff"
                  class="color000000 svgShape"
                ></path>
                <path
                  d="M29.6 37.3c-.3 0-.5-.2-.5-.5V26.7c0-.3.2-.5.5-.5s.5.2.5.5v10.1c0 .3-.2.5-.5.5zm1 1.4c-.3 0-.5-.2-.5-.5v-1.4c0-.3.2-.5.5-.5s.5.2.5.5v1.4c0 .2-.2.5-.5.5zm1.9 0c-.3 0-.5-.2-.5-.5v-1.4c0-.3.2-.5.5-.5s.5.2.5.5v1.4c0 .2-.2.5-.5.5zm-1.9-11.5c-.3 0-.5-.2-.5-.5v-1.4c0-.3.2-.5.5-.5s.5.2.5.5v1.4c0 .3-.2.5-.5.5zm1.9.1c-.3 0-.5-.2-.5-.5v-1.4c0-.3.2-.5.5-.5s.5.2.5.5v1.4c0 .2-.2.5-.5.5z"
                  fill="#ffffff"
                  class="color000000 svgShape"
                ></path>
                <path
                  d="M32.7 37.3h-4.1c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h4.1c1.1 0 2-.9 2-2s-.9-2-2-2h-.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h.5c1.6 0 3 1.4 3 3s-1.3 3-3 3z"
                  fill="#ffffff"
                  class="color000000 svgShape"
                ></path>
              </svg>
            </div>
            <div className="transfer_container_upper_first_first_container">
              <p>Total nodes</p>
              <h2>5</h2>
            </div>
          </div>
          <div className="transfer_container_upper_first_second"></div>
          <div className="transfer_container_upper_first_third">
            <div className="transfer_container_upper_svg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  fill="#ffffff"
                  d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
                />
              </svg>
            </div>

            <div className="transfer_container_upper_first_third_container">
              <p>Total accounts</p>
              <h2>5</h2>
            </div>
          </div>
        </div>
        <div className="transfer_container_upper_second">
          <div className="transfer_container_upper_second_first">
            <div className="transfer_container_upper_svg">
              <img src="data:image/png;base64,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" />
            </div>

            <div className="transfer_container_upper_second_first_container">
              <p>Total Transaction</p>
              <h2>5</h2>
            </div>
          </div>
          <div className="transfer_container_upper_second_second"></div>
          <div className="transfer_container_upper_second_third">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                fill="#ffffff"
                d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
              />
            </svg>

            <div className="transfer_container_upper_second_third_container">
              <p>Total accounts</p>
              <h2>5</h2>
            </div>
          </div>
        </div>
        <div className="transfer_container_upper_third"></div>
      </div>
    </div>

    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 700 }} aria-label="customized table">
    //     <TableHead>
    //       <TableRow>
    //         <StyledTableCell>TX HASH</StyledTableCell>
    //         <StyledTableCell align="left">METHOD</StyledTableCell>
    //         <StyledTableCell align="left">SOURCE</StyledTableCell>
    //         <StyledTableCell align="left">DESTINATION</StyledTableCell>
    //         <StyledTableCell align="left">STATUS</StyledTableCell>
    //         <StyledTableCell align="left">CREATED AT</StyledTableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <StyledTableRow key={row.name}>
    //           <StyledTableCell component="th" scope="row">
    //             {row.tx}
    //           </StyledTableCell>
    //           <StyledTableCell align="left">{row.method}</StyledTableCell>
    //           <StyledTableCell align="left">
    //             Axelar
    //             <br />
    //             {row.source}
    //           </StyledTableCell>
    //           <StyledTableCell align="left">
    //             Osmosis
    //             <br />
    //             {row.destination}
    //           </StyledTableCell>
    //           <StyledTableCell align="left">{row.status}</StyledTableCell>
    //           <StyledTableCell align="left">{row.create}</StyledTableCell>
    //         </StyledTableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};

export default Transfer;
