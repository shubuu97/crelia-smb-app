import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Style Import */
import './styles/historyView.less'
/* Component Imports */
import EachRow from './components/EachRow';


class HistoryView extends React.Component {

    constructor() {
        super();
        this.state = {
            toggleExtendedState: [],
        }
    }

    /* componentDidMount(){
        this.toggleExtendedStateUpdate()
    }

// * Init state of toggleExtendedState from no. of rows 
    toggleExtendedStateUpdate = () => {
        let allData = _get(this, "props.data", []);
        let toggleState = []
        allData.map((data, index) => {
            toggleState = [...toggleState, false]
        })
        this.setState({
            toggleExtendedState: toggleState
        })
    } */

    // * Toggle Extended Rows 
    toggleExtended = (data, index) => {
        this.state.toggleExtendedState[index] = !this.state.toggleExtendedState[index]
        this.setState({
            toggleExtendedState: this.state.toggleExtendedState
        })
        if (_get(this, 'props.extendedComponent.actionEvent')) {
            this.props.extendedComponent.actionEvent(data, index)
        }
    }
    // * Function to populate EachRow Components
    populateHistoryRows = () => {
        let allData = _get(this, 'props.data')
        let rows = allData.map((data, index) => {
            return (
                <React.Fragment>
                    <EachRow
                        key={index}
                        uncheckall={this.props.uncheckall}
                        checkCb={this.props.checkCb}
                        data={data}
                        onClick={() => this.toggleExtended(data, index)}
                        isExtended={this.state.toggleExtendedState[index]}
                        extendedComponent={_get(this, 'props.extendedComponent.component')}
                        dispatch={_get(this, 'props.dispatch')}
                        showCompare={this.props.showCompare}
                    />
                </React.Fragment>
            )
        })
        return (
            <div className="history-block">
                {rows.reverse()}
            </div>
        )
    }

    render() {
        return (
            <div >
                {this.populateHistoryRows()}
            </div>

        );
    }
}

export default HistoryView;
