import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Component Imports */
import ReviewCOBInfoContainer from '../../CompanyOnBoarding/components/ReviewCOBInfo/ReviewCOBInfoContainer'


import genericGetData from '../../../Global/dataFetch/genericGetData';


class NewComponent extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount(){
        this.handleFetchTransaction()
    }

    handleFetchTransaction = () => {
        genericGetData({
            dispatch: this.props.dispatch,
            url: `/api/TransactionHistory/${_get(this, 'props.data.key')}`,
            constant: {
                init: 'TransactionDetails_init',
                success: 'TransactionDetails_success',
                error: 'TransactionDetails_error'
            },
            identifier: 'TransactionDetails'

        }).then((data) => {
            console.log(data, "data")
            this.setState({ companyDetails: _get(data, 'eventsEmitted[0].company') })
        })
    }

    render() {
        return (
            <div>
                <ReviewCOBInfoContainer
                    fetchFromProp={true}
                    companyDetailsProp={this.state.companyDetails} 
                /> 
            </div>
        );
    }
}

export default NewComponent;