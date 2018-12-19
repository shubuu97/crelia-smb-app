import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material Imports */
import Button from '@material-ui/core/Button';
/* Component Imports */
import Extended from './Extended';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class EachRow extends React.Component {

    constructor() {
        super();
        this.state = {
            checked: false
        }
    }

    // * Populating Row Heading with Dynamic classNames for Custom Icons
    // Todo: Ask Vishnu to make a default icon, If no Icon is provided.
    populateHeading = () => {
        let headingData = _get(this, 'props.data.heading', [])
        let row = []
        row.push(headingData.map((data, index) => {
            return (
                <div className={`${_get(data, 'className', 'event-name')} wrapper-block`}>
                    <span className="block-title">{_get(data, 'title')}</span>
                    <span className="block-data">{_get(data, 'content')}</span>
                </div>
            )
        }))
        return (
            <React.Fragment>
                {row}
            </React.Fragment>
        )
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.uncheckall) {
            this.setState({ checked: false })
        }
    }
    handleChange = (datakey) => (event) => {
        console.log(datakey, "hjhj")
        this.props.checkCb(datakey);
        this.setState({ checked: true })
    }
    render() {
        return (
            <div className="history-row "  >
                <div className="flex-row">
                    <div className="short-history cursor-pointer" onClick={this.props.onClick}>
                        <div className="transaction-date">{_get(this, 'props.data.date.date')},<br />{_get(this, 'props.data.date.year')}</div>
                        {this.populateHeading()}
                        <div className="expend-bth">
                            <Button
                                isFetching={this.props.isFetchingPostUpdateToMarketPlace}
                                onClick={this.postMarketPlace}
                                color="primary"
                                variant="contained">View More
                            </Button>
                        </div>
                    </div>
                    {
                        _get(this, 'props.showCompare') ?
                            < FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={this.handleChange(_get(this.props, 'data.key'))}
                                        color='primary'
                                        checked={this.state.checked}
                                        value={'compare'}
                                    />
                                }
                                label={'Compare'}
                            /> : null
                    }
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
