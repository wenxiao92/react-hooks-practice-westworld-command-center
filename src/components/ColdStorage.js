import React from "react";
import { Segment } from "semantic-ui-react";
import HostList from "./HostList";

function ColdStorage({hosts, onHostClick}) {
  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        {/* Cold Storage contains hosts....but how? Directly? Or is there something else we could use to contain them... */}
        <HostList
        hosts={hosts}
        onHostClick={onHostClick}
        />
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
