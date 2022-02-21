import React from "react";
import { Segment } from "semantic-ui-react";
import Area from './Area'

function WestworldMap({areaProp, onHostClick}) {
  const displayArea = areaProp.map((eachArea) => (
    <Area
    key={eachArea.id}
    area={eachArea}
    onHostClick={onHostClick}
    />
  ))

  return <Segment id="map">{displayArea}</Segment>;
}

export default WestworldMap;
