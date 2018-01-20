import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText, Button, List, ListItem } from 'react-md';


class Step3Container extends Component {

  constructor(props) {
    super(props);
    
    this.getSymptomDetail = this.getSymptomDetail.bind(this);

    this.state = {
      symptom: {
        name: "",
        diagnoses: []
      }
    };
  };

  componentDidMount() {
    const { match } = this.props;
    const symptomId = match.params.id;
    this.getSymptomDetail(symptomId);
  };

  render() {
    const { symptom } = this.state;
    const diagnosesList = symptom.diagnoses;

    let diagnosesListItems = [];
    for (let [i, k] of Object.keys(diagnosesList).entries()) {
      diagnosesListItems.push(<ListItem key={diagnosesList[i].id} primaryText={diagnosesList[i].name} secondaryText={diagnosesList[i].frequency || "0"} onClick={() => this.incrementDiagnosisFrequency(diagnosesList[i].id)} />);
    };

    return (
      <div className="md-grid">
        <Card className="md-block-centered md-cell--8">
          <CardTitle title={"Please select the best diagnosis for " + symptom.name + " from the list below:"} />
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

  incrementDiagnosisFrequency(diagnosisId) {
    const { symptom } = this.state;
    let self = this;
    return axios
      // .post('/symptoms/' + symptom.id + '/diagnosis/' + topDiagnosisId, {})
      .put('/api/diagnosis/' + diagnosisId, {})
      .then(function (response) {
        self.props.history.push('/symptoms/' + symptom.id + '/final-report');
      })
  };

};

export default Step3Container;