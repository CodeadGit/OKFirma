import React from 'react';
import {
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
  } from "@mui/x-data-grid";

function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          border: "1px solid red",
          display: "flex",
          paddingLeft: "2rem",
        }}
      >
        <p className="myKesiflerim">Keşiflerim</p>
        <div className="rightSide">
          <div className="colors">
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
            <div className="color"></div>
          </div>
          <select onChange={(e) => console.log(typeof +e.target.value)}>
            <option value="1">1 hafta</option>
            <option value="2">2 hafta</option>
            <option value="3">3 hafta</option>
            <option value="4">4 hafta</option>
          </select>
          <div class="input-container">
            <input
              id="effective-date"
              type="date"
              name="effective-date"
              minlength="1"
              maxlength="64"
              placeholder=" "
              style={{ opacity: 0, position: "absolute" }}
              autocomplete="nope"
              required="required"
            ></input>
            <span class="bar">Tarihe Göre Sırala</span>
          </div>

          <GridToolbarFilterButton
            sx={{
              border: "1px solid red",
              paddingInline: "0 !important",
            }}
          />
          <GridToolbarExport
            sx={{
              border: "1px solid red",
              paddingInline: "0 !important",
            }}
          />
        </div>
      </GridToolbarContainer>
    );
  }

export default CustomToolbar;
