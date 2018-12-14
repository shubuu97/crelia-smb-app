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

    render() {
        return (
            <div className="history-row" onClick={this.props.onClick}>
                <div className="short-history">
                    <div className="transaction-date">{_get(this, 'props.data.date')},<br />{_get(this, 'props.data.year')}</div>

                    <div className="event-name wrapper-block">
                        <span className="block-title">Event Name</span>
                        <span className="block-data">{_get(this, 'props.data.eventName')}</span>
                    </div>

                    <div className="transaction-time wrapper-block">
                        <span className="block-title">Transaction Time</span>
                        <span className="block-data">{_get(this, 'props.data.time')}</span>
                    </div>

                    <div className="modified-by wrapper-block">
                        <span className="block-title">Modified By</span>
                        <span className="block-data">{_get(this, 'props.data.modifiedBy')}</span>
                    </div>

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
