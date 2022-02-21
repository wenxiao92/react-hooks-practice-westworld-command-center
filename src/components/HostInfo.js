import React from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";
import {Log} from "../services/Log";

function HostInfo({host, areas, onUpdateHost, onAddLog}) {
  const {firstName, active, imageUrl, gender, area} = host

  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.


  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  // const [options] = useState([
  //   { key: "some_area", text: "Some Area", value: "some_area" },
  //   { key: "another_area", text: "Another Area", value: "another_area" },
  // ]);
  //const [value] = useState("some_area");
  const options = areas.map((area) => ({
    key: area.name,
    text: area.formattedName,
    value: area.name,
  }));


  function handleOptionChange(e, { value }) {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled

    //console.log(value)

    //checks if there's anymore space in the current area. Remember that the area data is changed to formattedArea in the app component
    const newArea = areas.find((area) => area.name === value)
    //console.log(newArea.hosts) //displays the hosts in the current area
    if(newArea.hosts.length < newArea.limit){
    fetch(`http://localhost:3001/hosts/${host.id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'area': value}),
    })
    .then((r) => r.json())
    .then((data) => {
      //console.log(data)
      //returns the whole host data 
      onUpdateHost(data);

      onAddLog(Log.notify(`${host.firstName} set in area ${newArea.formattedName}`))
    })
    } else {
      onAddLog(
        Log.error(`Too many hosts. Cannot add ${host.firstName} to ${newArea.formattedName}`)
        //console.log("error")
      );
    }

  }



  function handleRadioChange() {
    //console.log(!host.active)
    fetch(`http://localhost:3001/hosts/${host.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'active': !host.active}),
    })
    .then((r)=> r.json())
    .then((updatedActive) => {onUpdateHost(updatedActive)
    })
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} | {gender === "Male" ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={active ? "Active" : "Decommissoned"}
                checked={active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
