import React from "react";
import "./Table.css";

const Table = ({ content, setState }) => {
  const sortTable = (column) => {
    const data = content;
    data.sort((first, second) => first[column] - second[column]);
    setState(data);
  };

  const names = {
    any: "Any",
    codi: "Codi",
    literal: "Municipi",
    homes_de_0_a_14_anys: "Homes 0-14 anys",
    homes_de_15_a_64_anys: "Homes 15-64 anys",
    homes_de_65_anys_i_m_s: "Homes 65+ anys",
    dones_de_0_a_14_anys: "Dones 0-14 anys",
    dones_de_15_a_64_anys: "Dones 15-64 anys",
    dones_de_65_anys_i_m_s: "Dones 65+ anys",
    total_de_0_a_14_anys: "Total 0-14 anys",
    total_de_15_a_64_anys: "Total 15-64 anys",
    total_de_65_anys_i_m_s: "Total 65+ anys",
  };
  return content.length > 0 ? (
    <div className="table-container">
      <table className="table">
        {/*         <caption>
          Població de Catalunya per municipi, rang d'edat i sexe
        </caption> */}
        <thead>
          <tr className="table__summary">
            <th colSpan="3">{content && `${content.length} Filas`}</th>
            <th colSpan="10" scope="colgroup">
              Població de Catalunya per municipi, rang d'edat i sexe
            </th>
          </tr>
          <tr className="table__head">
            {Object.entries(names).map(([key, value]) => {
              return (
                <th key={key} onClick={() => sortTable(key)}>
                  {value}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {content &&
            content.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, key) => (
                  <td key={key}>{cell}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p>no results</p>
  );
};

export default Table;
