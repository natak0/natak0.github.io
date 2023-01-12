import React, { useRef, useEffect, useState } from "react";
import Select from "../../Select/Select";
import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

const PlotLineChart = (appdata) => {
  const [town, setTown] = useState("Barcelona");
  const [filter, setFilter] = useState("total"); // genders: total, men, women
  const wrapper = useRef(null);

  const filterData = (filter) => {
    let x = d3.filter(appdata.data, (d) => d["literal"] === town);
    switch (filter) {
      case "total":
        x = x.map((d) => ({
          date: new Date(d["any"], 0),
          _0_a_14_anys: "total de 0 a 14 anys",
          _0_a_14_anys_number: +d["total_de_0_a_14_anys"],
          _15_a_64_anys: "total de 15 a 64 anys",
          _15_a_64_anys_number: +d["total_de_15_a_64_anys"],
          _65_anys_i_m_s: "total de 65 anys i mes",
          _65_anys_i_m_s_number: +d["total_de_65_anys_i_m_s"],
        }));
        return x;
      case "women":
        x = x.map((d) => ({
          date: new Date(d["any"], 0),
          _0_a_14_anys: "dones de 0 a 14 anys",
          _0_a_14_anys_number: +d["dones_de_0_a_14_anys"],
          _15_a_64_anys: "dones de 15 a 64 anys",
          _15_a_64_anys_number: +d["dones_de_15_a_64_anys"],
          _65_anys_i_m_s: "dones de 65 anys i mes",
          _65_anys_i_m_s_number: +d["dones_de_65_anys_i_m_s"],
        }));
        return x;
      case "men":
        x = x.map((d) => ({
          date: new Date(d["any"], 0),
          _0_a_14_anys: "homes de 0 a 14 anys",
          _0_a_14_anys_number: +d["homes_de_0_a_14_anys"],
          _15_a_64_anys: "homes de 15 a 64 anys",
          _15_a_64_anys_number: +d["homes_de_15_a_64_anys"],
          _65_anys_i_m_s: "homes de 65 anys i mes",
          _65_anys_i_m_s_number: +d["homes_de_65_anys_i_m_s"],
        }));
        return x;
      default:
        break;
    }
  };

  useEffect(() => {
    const data = filterData(filter);
    if (data !== undefined) {
      const chart = Plot.plot({
        style: {
          background: "white",
          padding: 5,
        },
        marks: [
          Plot.line(data, {
            x: "date",
            y: "_0_a_14_anys_number",
            stroke: "_0_a_14_anys",
            strokeWidth: 2,
          }),
          Plot.line(data, {
            x: "date",
            y: "_15_a_64_anys_number",
            stroke: "_15_a_64_anys",
            strokeWidth: 2,
          }),
          Plot.line(data, {
            x: "date",
            y: "_65_anys_i_m_s_number",
            stroke: "_65_anys_i_m_s",
            strokeWidth: 2,
          }),
          Plot.text(data, {
            x: "date",
            y: "_0_a_14_anys_number",
            text: "_0_a_14_anys_number",
            dy: -6,
          }),
          Plot.text(data, {
            x: "date",
            y: "_15_a_64_anys_number",
            text: "_15_a_64_anys_number",
            dy: -6,
          }),
          Plot.text(data, {
            x: "date",
            y: "_65_anys_i_m_s_number",
            text: "_65_anys_i_m_s_number",
            dy: -6,
          }),
        ],
        x: { nice: true, inset: 15, ticks: 2 },
        y: { grid: true, inset: 15 },
        marginRight: 50,
        marginLeft: 60,
        color: {
          legend: true,
        },
        caption: `Població dels municipis de ${town} segregada per rang d'edat - any
        2019-2020.`,
      });
      wrapper.current.append(chart);
      return () => chart.remove();
    }
  }, [wrapper, town, filter]);

  // unique names of municipios sorted alphabetically
  const towns = [
    ...new Set(
      appdata.data
        .map((item) => item.literal)
        .sort((first, second) => first - second)
    ),
  ];
  const genders = [
    { label: "total", value: "total" },
    { label: "dones", value: "women" },
    { label: "homes", value: "men" },
  ];
  return (
    <div ref={wrapper}>
      <h2>
        {`Població dels municipis de ${town} segregada per rang d'edat - any
        2019-2020.`}
      </h2>
      <div style={{ display: "inline-flex" }}>
        <Select
          classModifier="small"
          label="Municipi"
          options={towns.map((town) => {
            return { label: town, value: town };
          })}
          setValue={setTown}
          value={town}
        />
        <Select
          classModifier="small"
          label="Sexe"
          options={genders.map((gender) => {
            return { label: gender.label, value: gender.value };
          })}
          setValue={setFilter}
          value={filter}
        />
      </div>
    </div>
  );
};

export default PlotLineChart;
