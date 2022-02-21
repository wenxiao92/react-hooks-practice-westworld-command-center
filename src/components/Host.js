import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({host, onHostClick}) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  const {selected, imageUrl} = host;

  function handleClick(){
    onHostClick(host)
  }



  //styling of the host cards are given based on className =  to host selected or host. See css
  //for more info
  return (
    <Card
      className={selected ? "host selected" : "host"}
      onClick={handleClick}
      image={imageUrl}
      raised
      link
    />
  );
}

export default Host;
