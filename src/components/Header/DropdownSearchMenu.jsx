import React from "react";
import SearchIcon from "@material-ui/icons/Search";

function DropdownSearchMenu() {
  return (
    <div className="dropdown-menu" aria-labelledby="dropdownMenuSearchHeader">
      <div className="dropdown-item search-bar" disabled style={{ padding: "4px 0px 4px 0px" }}>
        <div className="form-group">
          <SearchIcon className="search-icon" />
          <input type="text" className="form-control" />
        </div>
        <div className="badges-group">
            <div role="button" className="badge bg-primary">Channel</div>
            <div role="button" className="badge bg-primary">User</div>
        </div>
      </div>
    </div>
  );
}

export default DropdownSearchMenu;
