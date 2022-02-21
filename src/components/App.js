import React, {useState, useEffect} from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap"
import Headquarters from "./Headquarters"
import { formatAreaName } from "../services/NameFormat"


function App() {
  const [hosts, setHosts] = useState([]);
  const [selectedHostId, setSelectedHostId] = useState(null);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/hosts')
    .then((r) => r.json())
    .then(setHosts)

    fetch('http://localhost:3001/areas')
    .then((r) => r.json())
    .then(setAreas)
  },[])

  //reformat the areas state to clean up names with weird character but also incorporate the
  //area value from the hosts
  const formattedAreas = areas.map((area) => ({
    // this won't persist on the server
    ...area,
    formattedName: formatAreaName(area.name),
    hosts: hosts.filter((host) => host.area === area.name),
  }));

  //reformat the hosts state to add selected key to each host that indicates if the host is selected
  //The state of selectedHostId is initially nothing. Then we assign a variable to change the state
  //for each host based on their active status. If false, they are false, they will get assigned
  //to this variable. Then these inactive hosts gets sent to the Cold Storage (and not sent to area)
  const formattedHosts = hosts.map((host) => ({
    // this won't persist on the server
    ...host,
    selected: host.id === selectedHostId,
  }))
  const inactiveHosts = formattedHosts.filter((host) => !host.active);

  //when a card is clicked, this callback function (a prop) that was passed all the way down to Host
  //will grab the id and change the state to the id of the selected card. Then we want to filter
  //our list of hosts by the selectedHostId's state
  function handleSelectHost(host){
    setSelectedHostId(host.id)
  }
  const selectedHostProp = hosts.find((host) => host.id === selectedHostId)

  //grabs the host in which the radiobutton was clicked on OR when area is changed
  //goes through list of hosts and changes the specific host when id match to either update active or area
  function handleActiveUpdate(host){
    const updatedHosts = hosts.map((eachHost) => eachHost.id === host.id ? host : eachHost)
    setHosts(updatedHosts)
  }

  //changes the all host's active status to true or false for current host state. Nothing was changed in server
  function handleClickActivate(activate) {
    // this won't persist on the server
    const updatedHosts = hosts.map((host) => ({
      ...host,
      active: activate,
    }));
    setHosts(updatedHosts);
  }
  const allHostsActive = hosts.length === hosts.filter((host) => host.active).length

  return (
    <Segment id="app">
      <WestworldMap areaProp={formattedAreas} onHostClick={handleSelectHost}/>
      <Headquarters areaProp={formattedAreas} hosts={inactiveHosts} selectedHost={selectedHostProp}
      onHostClick={handleSelectHost} onUpdateHost={handleActiveUpdate}
      allHostsActive={allHostsActive} onClickActivate={handleClickActivate}
      />
    </Segment>
  );
}

export default App;
