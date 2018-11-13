import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { withState } from 'recompose';
/* Global Components*/
import DropzoneArea from '../../../Global/dropzoneArea';
import decorateWithOnDrop from '../../../Global/onDropDecorater';
/* CSS Imports*/
import '../../styles/finance.css';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class FinancialInfoUpload extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="row justify-content-between ">
                    <div className="col-sm-6">
                        <DropzoneArea
                            title="Financial Statement for last three years"
                            fieldName='preview1'
                            onDrop={this.props.onDrop}
                            dropzone={this.props.state.preview1}
                        />
                    </div>
                    <div className="col-sm-6">
                        <DropzoneArea
                            title="2019 Forecast (optional)"
                            fieldName='preview2'
                            onDrop={this.props.onDrop}
                            dropzone={this.props.state.preview2}
                        />
                    </div>
                    <div className="col-sm-6">
                        <DropzoneArea
                            title="Business Plan"
                            fieldName='preview3'
                            onDrop={this.props.onDrop}
                            dropzone={this.props.state.preview3}
                        />
                    </div>
                    <div className="col-sm-6">
                    </div>
                    <div class="common-action-block col-sm-12">
                        <Button
                            type="submit"
                            fullWidth
                            disabled={localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? true : false || this.props.isFetching}
                            variant="contained"
                            color="primary"
                            className="btnprimary"
                        >
                            {this.props.isFetchingSave ? <CircularProgress size={24} /> : 'Save'}

                        </Button>
                        {localStorage.getItem('companyStatus') == 'PENDING_APPROVAL' ? null :
                           <Button
                           fullWidth
                           onClick={this.props.handleSubmitAprroval}                           variant='contained'
                           className="btnprimary  ml-35"
                           color='primary'>
                           Review
                          </Button> 
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

FinancialInfoUpload.propTypes = {
    classes: PropTypes.object.isRequired,
};

let state = withState('state', 'setState', '')


function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(state(decorateWithOnDrop(FinancialInfoUpload)));
