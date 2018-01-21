import React, { Component } from 'react';
import axios from 'axios';
import { SelectField, Button, Card, CardTitle } from 'react-md';


class Step1Container extends Component {

  constructor(props) {
    super(props);

    this.changeSelectedSymptomId = this.changeSelectedSymptomId.bind(this);
    this.navigateToStep2 = this.navigateToStep2.bind(this);

    this.state = {
      symptomsList: [],
      selectedSymptomId: null
    };
  };

  componentDidMount() {
    this.getSymptomsList();
  };

  render() {
    const isDisabled = this.state.selectedSymptomId ? false : true;
    
    return (
      <div className="md-grid">
        <Card className="md-block-centered md-cell--8">
          <CardTitle title="Please select your symptom from the list below" />
          <SelectField
            id="symptoms-select-field"
            label="Symptoms"
            placeholder="Select your symptom"
            className="md-cell"
            itemLabel="name"
            itemValue="id"
            menuItems={this.state.symptomsList}
            onChange={this.changeSelectedSymptomId}
            simplifiedMenu={true}
          />
          <Button flat primary disabled={isDisabled} onClick={this.navigateToStep2}>GO</Button>
        </Card>
      </div>
    );
  };

  navigateToStep2() {
    const { selectedSymptomId } = this.state;
    this.props.history.push('symptoms/' + selectedSymptomId);
  };

  getSymptomsList() {
    let self = this;
    return axios
      .get('/api/symptoms')
      .then(function (response) {
        self.setState({
          symptomsList: response.data
        });
      })
  };

  changeSelectedSymptomId(value) {
    this.setState({
      selectedSymptomId: value
    });
  };

};

export default Step1Container;