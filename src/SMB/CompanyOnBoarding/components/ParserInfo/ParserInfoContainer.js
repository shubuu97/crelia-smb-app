import React, { Component } from 'react';
import _get from 'lodash/get'
import _without from 'lodash/without';
import _merge from 'lodash/merge';
import { connect } from 'react-redux';


class ParserInfoContainer extends Component {

    render() {
        let DataKeys = Object.keys(_get(this.props.ParseData, 'data', {}));
        let years = []
        if (Array.isArray(DataKeys)) {
            years = _without(DataKeys, 'index');
        }
        let year1 = _get(this.props, `ParseData.data.${DataKeys[0]}`, {});
        let year2 = _get(this.props, `ParseData.data.${DataKeys[1]}`, {});
        let year3 = _get(this.props, `ParseData.data.${DataKeys[2]}`, {});
        let index = _get(this.props, `ParseData.data.${DataKeys[3]}`, {});

        let indexarr = Object.keys(index).map((i) => {
            return index[i]
        })

        let year1arr = Object.keys(year1).map((i) => {
            return year1[i]
        });
        let year2arr = Object.keys(year2).map((i) => {
            return year2[i]
        });
        let year3arr = Object.keys(year3).map((i) => {
            return year3[i]
        });

        let bodyarray = [];
        for (let i = 0; i < indexarr.length; i++) {
            let rowArray = [];
            rowArray.push(indexarr[i], year1arr[i], year2arr[i], year3arr[i]);
            bodyarray.push(rowArray);
        }


        return (
            <div>
                Income Statement
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>in _{_get(this.props.ParseData, 'currency', '')}</th>
                            {years.map(year => <th>{year}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {bodyarray.map((rowArray, indexBody) => {
                            let cellArray = rowArray.map((cell, indexRow) => {
                                return <td key={indexRow}>{cell}</td>
                            })
                            return <tr key={indexBody}>{cellArray}</tr>
                        })
                        }

                    </tbody>

                </table>
                


            </div>
        )
    }
}





function mapStateToProps(state) {
    return { ParseData: _get(state, 'ParseData.lookUpData') }
};

export default connect(mapStateToProps)(ParserInfoContainer)