import React from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host"

//this is taking two sets of 'hosts' prop from ColdStorage (filtered for inactive hosts) and
//Area (filtered by their area and b/c they are active). The area hosts will show up on the map and
//the ColdStorage hosts will show at the bottom
function HostList({hosts, onHostClick}) {
  const displayHosts = hosts.map((eachHost) => (
    <Host
    key={eachHost.id}
    host={eachHost}
    onHostClick={onHostClick}
    />
  ))

  return (
    <Card.Group itemsPerRow={6}>{displayHosts}</Card.Group>
  );
}

export default HostList;
