import React, {useState} from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage"
import LogPanel from "./LogPanel"

function Headquarters({areaProp, hosts, selectedHost, onHostClick, onUpdateHost, allHostsActive, onClickActivate}) {

  //sends callback to HostInfo b/c when host is activated/decommissoned some comments will be logged
  //logs are not use in any other components, so this will hold the state for LogPanel and Details component
  const [logs, setLogs] = useState([]);

  function handleAddLog(log) {
    setLogs([...logs, log]);
  }

  return (
    <Grid celled="internally">
      <Grid.Column width={8}><ColdStorage hosts={hosts} onHostClick={onHostClick}/></Grid.Column>
      <Grid.Column width={5}>
        <Details
        areas={areaProp}
        host={selectedHost}
        onUpdateHost={onUpdateHost}
        onAddLog={handleAddLog}
        />
      </Grid.Column>
      <Grid.Column width={3}>
      <LogPanel
          logs={logs}
          onAddLog={handleAddLog}
          allHostsActive={allHostsActive}
          onClickActivate={onClickActivate}
        />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
