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
    this.props.handleSubmitAprroval()
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <form>
          <div className="Onboarding_Title"> Financial Summary</div>
          <p> Please share some additional information on your company performance.</p>
          <div className="row justify-content-between pt-20">
            <div className="col-sm-12 finan-tab">
              <div className={this.state.type == 'file' ? "active" : ""} onClick={() => this.handleSwitch('file')}> Upload File</div> <span>OR</span>
              <div className={this.state.type == 'upload' ? "active" : ""} onClick={() => this.handleSwitch('upload')}>Fill out manually</div>
            </div>
          </div>
          <div className="row justify-content-between pt-20">
            <div className="col-sm-12">
              {
                this.state.type == 'file' ? <FinancialInfoUpload isFetchingApprove={this.props.isFetchingApprove} isFetchingSave={this.props.isFetchingSave} handleSubmitAprroval={this.handleSubmitAprroval} handleNext={this.props.handleNext} /> : <FinancialInformationForm isFetchingApprove={this.props.isFetchingApprove} isFetchingSave={this.props.isFetchingSave} initialValues={this.props.initialValues} handleSubmitAprroval={this.handleSubmitAprroval} handleNext={this.props.handleNext} />
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
