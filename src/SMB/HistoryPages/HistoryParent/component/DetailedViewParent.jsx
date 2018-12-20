import React from 'react';
import moment from 'moment';
/* Lodash Imports */
import _get from 'lodash/get';
/* Data Fetcher Imports */
import genericGetData from '../../../../Global/dataFetch/genericGetData';
/* Material import */
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports */

/* Component Imports */

function DetailedViewFun(PopulateDataDetails)
{
return class DetailedView extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
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
            this.setState({ allData: _get(data, 'eventsEmitted[0]') })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.allData ?
                        <div className="history-extended-card p-10">
                            <PopulateDataDetails
                            allData={this.state.allData}
                            />
                        </div> :
                        <div className="history-extended-card p-10 flex-row justify-center">
                            <CircularProgress />
                        </div>
                }
            </div>

        );
    }
}
}

export default DetailedViewFun;