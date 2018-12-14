import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material components import */

/* Component Imports */
import Extended from './Extended'


class EachRow extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    populateHeading = () => {

        let headingData = _get(this, 'props.data.heading', [])
        let row = []
        row.push(headingData.map((data, index) => {
            return (
                <div className={`${data.className} wrapper-block`}>
                    <span className="block-title">{data.title}</span>
                    <span className="block-data">{data.content}</span>
                </div>
            )
        }))
        return (
            <React.Fragment>
                {row}
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className="history-row" onClick={this.props.onClick}>
                <div className="short-history">
                    <div className="transaction-date">{_get(this, 'props.data.date.date')},<br />{_get(this, 'props.data.date.year')}</div>
                    {this.populateHeading()}
                    <div className="expend-bth">View Button</div>
                </div>
                <div className="detailed-history">
                    {
                        this.props.isExtended ?
                            <Extended
                                {...this.props}
                            />
                            : null
                    }
                </div>
            </div>
        );
    }
}

export default EachRow;
