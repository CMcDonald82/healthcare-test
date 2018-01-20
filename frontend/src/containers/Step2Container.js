import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText, Button } from 'react-md';
import { isEmpty } from '../utils/utils';

class Step2Container extends Component {

  constructor(props) {
    super(props);

    this.getSymptomDetail = this.getSymptomDetail.bind(this);
    this.incrementDiagnosisFrequency = this.incrementDiagnosisFrequency.bind(this);
    this.navigateToStep3 = this.navigateToStep3.bind(this);

    this.state = {
      // symptom: {}
      symptom: {
        name: "",
        diagnoses: []
      },
      topDiagnosis: {
        name: "",
        frequency: 0
      }
    };
  };

  componentDidMount() {
    const { match } = this.props;
    const symptomId = match.params.id;
    console.log("symptomId: ", symptomId);
    this.getSymptomDetail(symptomId);
  };

  render() {
    const { symptom, topDiagnosis } = this.state;
    console.log("symptom: ", symptom);
    const symptomName = isEmpty(symptom) ? "" : symptom.name;
    const topDiagnosisName = isEmpty(topDiagnosis) ? "" : topDiagnosis.name;
    console.log("topDiagnosis: ", topDiagnosis);
    
    return (
      <div className="md-grid">
        <Card className="md-block-centered md-cell--8">
          <CardTitle title={"Most Likely Diagnosis For " + symptomName + ":"} />
          <CardText>
            <h1>{topDiagnosisName}</h1>
            <h6>Is this correct?</h6>
            <Button flat primary onClick={this.incrementDiagnosisFrequency}>YES</Button>
            <Button flat secondary onClick={this.navigateToStep3}>NO</Button>
          </CardText>
        </Card>
      </div>
    );
  };

  navigateToStep3() {
    const { symptom } = this.state;
    this.props.history.push('/symptoms/' + symptom.id + '/diagnoses');
  };

  getSymptomDetail(symptomId) {
    let self = this;
    return axios
      .get('/api/symptoms/' + symptomId)
      .then(function (response) {
        self.setState({
          symptom: response.data,
          topDiagnosis: self.getRandomDiagnosis(response.data.diagnoses) //response.data.diagnosis //response.data.diagnoses[0] // try making a function to get a random top diagnosis. Can try using response.data.diagnoses and using es6 array.filter() function to filter on top frequency and then choose a random instance from the filtered array
        });
      })
  };

  incrementDiagnosisFrequency() {
    const { symptom, topDiagnosis } = this.state;
    const topDiagnosisId = isEmpty(topDiagnosis) ? "" : topDiagnosis.id;
    console.log('topDiagnosisId: ', topDiagnosisId);
    let self = this;
    return axios
      // .post('/symptoms/' + symptom.id + '/diagnosis/' + topDiagnosisId, {})
      .put('/api/diagnosis/' + topDiagnosisId, {})
      .then(function (response) {
        self.props.history.push('/symptoms/' + symptom.id + '/final-report');
      })
  };

  getRandomDiagnosis(diagnoses) {
    console.log("random diagnoses: ", diagnoses);
    const max_frequency = diagnoses[0].frequency;
    const top_diagnoses = diagnoses.filter(diagnosis => diagnosis.frequency === max_frequency);
    console.log("top_diagnoses: ", top_diagnoses);
    const random_diagnosis = top_diagnoses[Math.floor(Math.random() * top_diagnoses.length)];
    console.log("random_diagnosis: ", random_diagnosis);
    return random_diagnosis;
  };

};

export default Step2Container;