import React from 'react';
import moment from 'moment';
/* Lodash Imports */
import _get from 'lodash/get';
/* Data Fetcher Imports */
import genericGetData from '../../../../Global/dataFetch/genericGetData';
/* Material import */
import CircularProgress from '@material-ui/core/CircularProgress';
/* Redux Imports */
import transactionDataFetcher from '../../../../Global/dataFetch/transactionDataFetcher'
/* Component Imports */
import { diff } from 'deep-object-diff';


function ComparisonViewFun(PopulateDataComparison,key)
{
return class ComparisonView extends React.Component {

    constructor() {
        super();
        this.state = {
            previous: null,
            current: null,
            diffrence: null,
            changedKeys: [],
        }
    }


    componentDidMount() {
        let id1 = this.props.compareIds[0];
        let id2 = this.props.compareIds[1];
        let p1 = transactionDataFetcher(this.props.dispatch, id1);
        let p2 = transactionDataFetcher(this.props.dispatch, id2);
        Promise.all([p1, p2]).then((values) => {
            let lhs = _get(values, `[0].eventsEmitted[0].${key}`);
            let rhs = _get(values, `[1].eventsEmitted[0].${key}`);
            //let diffrenceObj = diff(lhs, rhs);
            //let ChangedKeys = []
            // diffrenceObj.map((data, index) => {
            //     let path = _get(data,`path`,[]);
            //     ChangedKeys.push(path[path.length-1]);
            // });
            let updatedObj = diff(lhs, rhs);
            this.setState({ previous: lhs, current: rhs, diffrence: updatedObj })
        })
    }

    render() {
        return (
            <div className="p-10 ">
                {this.state.current ?
                    <PopulateDataComparison
                    current ={this.state.current}
                    previous = {this.state.previous}
                    diffrence = {this.state.diffrence}
                    /> :
                    <div className="width-100-percent flex-row justify-center">
                        <CircularProgress />
                    </div>
                    
                }
            </div>

        );
    }
}
}
export default ComparisonViewFun;