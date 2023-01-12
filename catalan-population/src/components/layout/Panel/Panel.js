import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../services/AppContext/AppContextCreator";
import DonutChart from "../../charts/Donut/Donut";
import PlotLineChart from "../../charts/LineChart/PlotLineChart";
import Search from "../../Search/Search";
import Table from "../../Table/Table";
import ChartWrapper from "../navigation/ChartWrapper/ChartWrapper";
import "./Panel.css";

function Panel() {
  const appData = useContext(AppContext);
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    if (searchValue.length > 0 && appData.data) {
      if (searchValue.length <= 6 && Number.isInteger(parseInt(searchValue))) {
        const row = appData.data.filter((value) =>
          value.codi.toLowerCase().includes(searchValue.toLowerCase())
        );
        setData(row);
      } else {
        const row = appData.data.filter((value) =>
          value.literal.toLowerCase().includes(searchValue.toLowerCase())
        );
        setData(row);
      }
    }
  }, [searchValue]);

  return (
    <main className="panel">
      <h1>
        Població dels municipis de Catalunya segregada per rang d'edat i sexe.
      </h1>
      <p>
        Informació elaborada per l'IDESCAT a partir del Padró municipal
        d'habitants. Dades del darrer padró disponible, any 2019-2020.
      </p>
      {appData && appData.data && (
        <div className="panel--row">
          <ChartWrapper>
            <div className="chart-container__item">
              <DonutChart
                data={
                  data && searchValue.length > 0 && data.length === 2
                    ? data
                    : appData.data
                }
              />
            </div>
          </ChartWrapper>
          <ChartWrapper>
            <div className="chart-container__item">
              <PlotLineChart data={appData.data} />
            </div>
          </ChartWrapper>
          {/*   {appData !== undefined && <Map points={appData.data} />} */}
        </div>
      )}
      <div className="panel--right"> </div>
      <div className="panel__table">
        <Search
          placeholder="Trobar per municipi o codi"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        {appData && (
          <Table
            content={data && searchValue.length > 0 ? data : appData.data}
            setState={setData}
          />
        )}
      </div>
    </main>
  );
}

export default Panel;
