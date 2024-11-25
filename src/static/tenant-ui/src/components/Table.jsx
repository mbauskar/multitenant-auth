import React, { useEffect, useState } from "react";

const TableRow = (props) => {
  const {
    item = {},
    columns = [],
    allowRowClick = true,
    onRowClick = () => null,
  } = props;
  if (!item || !columns.length) {
    return null;
  }

  const handleClick = () => {
    if (!allowRowClick) {
      return;
    }
    onRowClick(item);
  };

  return (
    <tr className={allowRowClick ? "clickable-row" : ""} onClick={handleClick}>
      {columns.map(({ name = "" }) => {
        let value = name in item ? item[name] : "";
        return <td>{value}</td>;
      })}
    </tr>
  );
};

const Table = (props) => {
  const {
    items = [],
    columns = [],
    allowRowClick = true,
    onRowClick = () => null,
  } = props;
  if (!items.length || !columns.length) {
    return "invalid table definition";
  }

  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          {columns.map(({ label = "" }) => {
            return <th scope="col">{label}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {items.map((item, idx) => {
          return (
            <TableRow
              key={`table-row-${idx}`}
              item={item}
              columns={columns}
              allowRowClick={allowRowClick}
              onRowClick={onRowClick}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
