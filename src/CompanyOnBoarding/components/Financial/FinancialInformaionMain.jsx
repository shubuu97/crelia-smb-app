import React from 'react';
import styles from '../../styles/business-info'
import PropTypes from 'prop-types';
/* Material Imports*/
import { withStyles } from '@material-ui/core/styles';
/* Other Components*/
import FinancialInfoUpload from './FinancialInfoUpload'
import FinancialInformationForm from './FinancialInformationForm';
import LoanProvider from './LoanProvider';


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
              <div className={this.state.type == 'file' ||this.state.type == 'upload' ? "active" : ""} onClick={() => this.handleSwitch('file')}> Finanacial Data</div> 
              <div className={this.state.type == 'loanProvider' ? "active" : ""} onClick={() => this.handleSwitch('loanProvider')}>Loan Provider</div>
            </div>
          </div>

         {this.state.type=='file'||this.state.type=='upload'? <div className="row justify-content-between pt-20">
            <div className="col-sm-12 finan-sub-tab">
              <div className={this.state.type == 'file' ? "active" : ""} onClick={() => this.handleSwitch('file')}> Upload File</div> <span>OR</span>
              <div className={this.state.type == 'upload' ? "active" : ""} onClick={() => this.handleSwitch('upload')}>Fill out manually</div>
            </div>
          </div>:null}
          <div className="row justify-content-between pt-20">
            <div className="col-sm-12">
              {
                this.state.type == 'file' ? <FinancialInfoUpload 
                isFetchingApprove={this.props.isFetchingApprove} 
                isFetchingSave={this.props.isFetchingSave} 
                handleSubmitAprroval={this.handleSubmitAprroval} 
                handleNext={this.props.handleNext} /> : 
                
            <div>{this.state.type=='upload'?  
            <FinancialInformationForm 
            isFetchingApprove={this.props.isFetchingApprove}
            initialValues={this.props.initialValuesFinanceForm}
             isFetchingSave={this.props.isFetchingSave} 
             handleSubmitAprroval={this.handleSubmitAprroval}
              handleNext={this.props.handleNext} />:
              <LoanProvider
              initialValues={this.props.initialValuesLoanProvider}
               isFetchingApprove={this.props.isFetchingApprove}
                isFetchingSave={this.props.isFetchingSave}
                  handleSubmitAprroval={this.handleSubmitAprroval}
                 handleNext={this.props.handleNext}/>}</div>
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
