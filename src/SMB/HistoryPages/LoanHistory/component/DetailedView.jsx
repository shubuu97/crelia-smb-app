import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Data Fetcher Imports */
import genericGetData from '../../../../Global/dataFetch/genericGetData';
/* Material import */

/* Redux Imports */ 

/* Component Imports */


class DetailedView extends React.Component {

    constructor(){
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
        let keyValue = _get(this, 'props.data.key')
        console.log(this.state.companyDetails, 'HistoryView - companyDetails')
        return (
            <div>
                The key is {keyValue}
            </div>
        );
    }
}

export default DetailedView;