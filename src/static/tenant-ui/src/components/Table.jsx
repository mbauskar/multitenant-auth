import React, { useEffect, useState } from "react";

const TableRow = (props) => {
  const { isHeader = false, item = {}, columns = [] } = props;
  if (!item || !columns.length) {
    return null;
  }

  return (
    <tr>
      {columns.map(({ name = "" }) => {
        let value = name in item ? item[name] : "";
        return <td>{value}</td>;
      })}
    </tr>
  );
};

const Table = (props) => {
  const { items = [], columns = [] } = props;
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
            <TableRow key={`table-row-${idx}`} item={item} columns={columns} />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
