/* React Imports */
import React, { Component } from 'react';
/* Material Imports */
import CssBaseline from '@material-ui/core/CssBaseline';

/* Redux Imports */
import { connect } from 'react-redux';
import _get from 'lodash/get';



class FundType extends Component {
    selectUser = path => {
            this.props.history.push(`/LoanRequest/${path}`);
    };

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <div className="col-sm-12 ">
                    <h1>Choose type of fund you want to request</h1>
                    <span className="backaction" onClick={() => this.props.history.push('/LoanRequest')}>
                        <i class="material-icons leftarrow">keyboard_arrow_left</i>
                        back
                    </span>
                    <div className="row">
                        <div className="col-sm-4 user-type" id="loan" onClick={()=>this.selectUser('create')}>
                            <div className="cardwrapper user-type-details">
                                <div className="user-type-icon sme-type"></div>
                                <div className="user-type-title">Loan</div>
                                <p className="pt-20"></p>
                            </div>
                        </div>
                        <div className="col-sm-4 user-type" id="equity" onClick={()=>this.selectUser('Equitycreate')}>
                            <div className="cardwrapper user-type-details">
                                <div className="user-type-icon intvestor-type"></div>
                                <div className="user-type-title">Equity</div>
                                <p className="pt-20"></p>
                            </div>
                        </div>
                        {/* <div className="col-sm-4 user-type" id="other" onClick={this.selectUser}>
                            <div className="cardwrapper user-type-details">
                                <div className="user-type-icon intvestor-type"></div>
                                <div className="user-type-title">Not Sure</div>
                                <p className="pt-20"></p>
                            </div>
                        </div> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) { }

export default connect(mapStateToProps)(FundType)
