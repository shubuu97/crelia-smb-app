import React from 'react';
import styles from '../../styles/business-info'
import PropTypes from 'prop-types';
/* Material Imports*/
import { withStyles } from '@material-ui/core/styles';
/* Other Components*/
import FinancialInfoUpload from './FinancialInfoUpload'
import FinancialInformationForm from './FinancialInformationForm'


class FinancialInformationMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = { type: 'file' }
  }

  handleSwitch = (type) => {
    this.setState({ type })
  }

  handleSubmitAprroval = () => {
    this.props.handleSubmitAprroval();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <form>
          <div className="Onboarding_Title"> Financial Summary</div>
          <p> To Proceed with your loan request please share additional information on your company performance</p>
          <div className="row justify-content-between pt-20">
            <div className="col-sm-12 finan-tab">
              <div className={this.state.type == 'file' ? "active" : ""} onClick={() => this.handleSwitch('file')}> Upload File</div>
              <div className={this.state.type == 'upload' ? "active" : ""} onClick={() => this.handleSwitch('upload')}>Fill out the file manually</div>
            </div>
          </div>
          <div className="row justify-content-between pt-20">
            <div className="col-sm-12">
              {
                this.state.type == 'file' ? <FinancialInfoUpload handleSubmitAprroval={this.handleSubmitAprroval} handleNext={this.props.handleNext} /> : <FinancialInformationForm handleSubmitAprroval={this.handleSubmitAprroval} handleNext={this.props.handleNext} />
              }
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

FinancialInformationMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FinancialInformationMain);
