import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';

/* Data Fetcher Imports */
import genericPostData from '../../../Global/dataFetch/genericPostData';
import basicDataFetcher from '../../../Global/dataFetch/basicDataFetcher';


/* Lodash Imports */
import _get from 'lodash/get';
import transactionDataFetcher from '../../../Global/dataFetch/transactionDataFetcher';

import diff from 'deep-diff'


class CompareHistoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({
            hasError: true
        });
        // You can also log the error to an error reporting service
        console.log(error)
    }
    componentDidMount() {
        let id1 = this.props.match.params.id1;
        let id2 = this.props.match.params.id2;
        let p1 = transactionDataFetcher(this.props.dispatch, id1);
        let p2 = transactionDataFetcher(this.props.dispatch, id2);
        Promise.all([p1, p2]).then((values) => {
            console.log(values, "jhere");
            let lhs = _get(values, '[0].eventsEmitted[0].fund');
            let rhs = _get(values, '[1].eventsEmitted[0].fund');
            let diffrenceObj = diff(lhs, rhs);
            console.log(diffrenceObj, "1234")

        })

        console.log(id1, id2, "jjkj")
    }
    render() {
        return ( 
            <div className = 'smbhistory' >compare history container will come here </div>
        )
    }

}

function mapStateToProps(state) {
    return {}
}
export default connect(mapStateToProps)(CompareHistoryContainer)