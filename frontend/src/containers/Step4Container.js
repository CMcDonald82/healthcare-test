import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText, List, ListItem } from 'react-md';
import { isEmpty } from '../utils/utils';


class Step4Container extends Component {

  constructor(props) {
    super(props);

    this.getSymptomDetail = this.getSymptomDetail.bind(this);

    this.state = {
      symptom: null
    };
  };

  componentDidMount() {
    const { match } = this.props;
    const symptomId = match.params.id;
    this.getSymptomDetail(symptomId);
  };

  render() {
    const { symptom } = this.state;
    const symptomName = isEmpty(symptom) ? "" : symptom.name;
    const diagnosesList = isEmpty(symptom) ? "" : symptom.diagnoses;
  
    let diagnosesListItems = [];

    for (let [i] of Object.keys(diagnosesList).entries()) {
      let diagnosis = diagnosesList[i];
      diagnosesListItems.push(<ListItem key={diagnosis.id} primaryText={diagnosis.name} secondaryText={diagnosis.frequency || "0"} />);
    };

    return (
      <div className="md-grid">
        <Card className="md-block-centered md-cell--8">
          <CardTitle title="Thank You!" />
          <CardText>
            <h6>Here are the current frequencies of diagnoses for your symptom:</h6>
            <h3>{symptomName}</h3>
          </CardText>
          <List>
            {diagnosesListItems}
          </List>
        </Card>
      </div>
    );
  };

  getSymptomDetail(symptomId) {
    let self = this;
    return axios
      .get('/api/symptoms/' + symptomId)
      .then(function (response) {
        self.setState({
          symptom: response.data
        });
      })
  };

};

export default Step4Container;