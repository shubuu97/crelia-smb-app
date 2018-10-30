import React, { Component } from 'react';
import logo from './logo.svg';
import './Test.css';

import TextField from '../Global/GlobalTextField'
import Stepper from '../Global/StepWizard';
import CompanyOnBoarding from '../CompanyOnBoarding/CompanyOnBoarding_About'


class Test extends Component {
  render() {
    return (
      <div className="">
      
        <Stepper
          length={3}
          component={[<CompanyOnBoarding/>,<CompanyOnBoarding/>,<CompanyOnBoarding/>]}
          label={['About','Contact','Finacial']}
        />
      </div>
    );
  }
}

export default Test;
