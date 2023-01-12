import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import Select from "../../Select/Select";

const DonutChart = (appdata) => {
  const [year, setYear] = useState("2019");
  const wrapper = useRef(null);

  const width = 400;
  const height = 400;
  const margin = 10;

  useEffect(() => {
    d3.select(wrapper.current).selectAll("svg").remove();
  }, [year, appdata.data]);

  useEffect(() => {
    const dataPerYear = appdata.data.filter((d) => d.any === year);
    const totalPerYear = [
      {
        name: "0- 14",
        value: d3.sum(dataPerYear, (d) => d.total_de_0_a_14_anys),
      },
      {
        name: "15-64",
        value: d3.sum(dataPerYear, (d) => d.total_de_15_a_64_anys),
      },
      {
        name: "65+",
        value: d3.sum(dataPerYear, (d) => d.total_de_65_anys_i_m_s),
      },
    ];

    const svg = d3
      .select(wrapper.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const radius = Math.min(width, height) / 2 - margin;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.value);
    const data = pie(totalPerYear);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.2)
      .outerRadius(radius * 0.8);

    svg
      .selectAll("slice")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "slice")
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d));

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => `${d.data.name}: ${d.data.value}`)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .style("text-anchor", "middle")
      .attr("fill", "white")
      .attr("fontSize", "20");

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", 0)
      .attr("y", height / 2 - margin)
      .attr("text-anchor", "middle")
      .text(
        `Població total dels municipis de ${
          appdata.data && appdata.data.length === years.length
            ? appdata.data[0]["literal"]
            : "Catalunya"
        } - any ${year}.`
      );
  }, [wrapper, year, appdata.data]);

  const years = [...new Set(appdata.data.map((item) => item.any))]; // unique years

  return (
    <div ref={wrapper}>
      <h2>
        {`Població total dels municipis de ${
          appdata.data && appdata.data.length === years.length
            ? appdata.data[0]["literal"]
            : "Catalunya"
        } segregada per rang d'edat - any ${year}.`}
      </h2>
      <Select
        classModifier="small"
        label="Any"
        options={years.map((year) => {
          return { label: year, value: year };
        })}
        setValue={setYear}
        value={year}
      />
    </div>
  );
};

export default DonutChart;
