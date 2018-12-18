import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports*/
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
/* Style Imports*/
import './styles/cardTable.less'
/* Components Imports*/
import EachRow from './features/EachRow'
import Filters from './features/Filters'
import Heading from './features/Heading';
import Pagination from './features/Pagination'

class CardTable extends Component {

    constructor() {
        super();
        this.state = {
            headingData: [],
            filterData: [],
            filterPanelToggle: false,
            toggleExtendedState: [],
            hoverEvent: false,
        }
    }

    componentDidMount() {
        this.populateHeading();
        this.toggleExtendedStateUpdate();
        this.setState(
            { filterData: this.props.filterData }
        )
    }

    /* Heading Button click event*/
    handleClick = (actionEvent, data, index) => {
        return (event) => {
            actionEvent(data, this.props.rowId);
        }
    }
    /* Handle Search data */
    handleSearch = (actionEvent, data) => {
        actionEvent(data)
    }


    /* Update State of toggleExtended from no. of rows*/
    toggleExtendedStateUpdate = () => {
        let allData = _get(this, "props.data", []);
        let toggleState = []
        allData.map((data, index) => {
            toggleState = [...toggleState, false]
        })
        this.setState({
            toggleExtendedState: toggleState
        })
    }

    handleOnMouseOver = () => {
        this.setState({ hoverEvent: true })
    }
    handleOnMouseOut = () => {
        this.setState({ hoverEvent: false })
    }

    /* Isolating Heading Data and saving in State */
    /* Headings are pulled from first group of DataSet removing extendedData and adding actions if prompted */
    populateHeading = () => {
        let allData = _get(this, "props.data[0]", {})
        let headingData = Object.keys(allData).filter((keyname) => {
            let hiddenHeading = false
            if(_get(allData[keyname], 'type') == 'hidden') {
                hiddenHeading = true
            }
            if (keyname != "extendedRow" && keyname != "extendedTable" && keyname != "rowStyle" && !hiddenHeading && keyname != "allowedActions") {
                return true
            }
            return false
        })
        if (this.props.soloActions || this.props.menuActions) {
            headingData.push("Actions");
        }
        headingData.map((data, index) => {
            headingData[index] = data.replace(/([a-z])([A-Z])/g, '$1 $2');
        })
        this.setState({
            headingData: headingData
        })
    }

    /* Isolating Row data and generating EachRow components */
    populateRows = () => {
        let allData = _get(this, "props.data", []);
        console.log("allData", allData)
        let Rows = allData.map((data, index) => {
            return (
                <EachRow
                    rowId={index}
                    rows={data}
                    height="69px"
                    getHeight={this.getHeight}
                    onClick={() => this.toggleExtended(data, index)}
                    isExtended={this.state.toggleExtendedState[index]}
                    extendedTableProps={this.props.extendedTableProps}
                    extendedComponent={_get(this, 'props.extendedComponent.component')}
                    openOfferModal={this.props.openOfferModal}
                    soloActions={this.props.soloActions}
                    menuActions={this.props.menuActions}
                    handleOnMouseOver={this.handleOnMouseOver}
                    handleOnMouseOut={this.handleOnMouseOut}
                />
            )
        })
        return Rows
    }

    /* Toggle Extended rows */
    toggleExtended = (data, index) => {
        if(!this.state.hoverEvent){
            this.state.toggleExtendedState[index] = !this.state.toggleExtendedState[index]
            this.setState({
                toggleExtendedState: this.state.toggleExtendedState
            })
            if(_get(this, 'props.extendedComponent.actionEvent')){
                this.props.extendedComponent.actionEvent(data, index)
            }
        }
    }

    /* Toggle Filter Panel*/
    toggleFilterPanel = () => {
        this.setState({
            filterPanelToggle: this.state.filterPanelToggle ? false : true
        })
    }

    render() {
        return (
            <div className="card-table">
                {_get(this, 'props.title') ?
                    <div className="title-btn sticky " id="table-heading">
                        <h1>{_get(this, 'props.title')}</h1>
                        <div className="flex-row">

                            {
                                this.props.searchOption ?
                                    <input class="search-input" id="CardTableSearchBox" type="search" placeholder="Search" onChange={(event) => this.handleSearch(_get(this, 'props.searchOption.actionEvent'), event.target.value)}></input> :
                                    null
                            }


                            {
                                this.props.filterData ?
                                    <Button color='primary' variant='outlined' className='mb-10 mr-20 g-filters' onClick={() => this.toggleFilterPanel()}>Filter</Button> :
                                    null
                            }

                            {
                                this.props.headingButtons ?
                                    this.props.headingButtons.map((actionData, index) => {
                                        return (
                                            <Button
                                                title={_get(actionData, 'Title', "")}
                                                onClick={this.handleClick(_get(actionData, 'actionEvent'), this.props.data)}
                                                color='primary'
                                                variant='contained'
                                                className={_get(actionData, 'className')}
                                            >{_get(actionData, 'Title', "")}</Button>
                                        )
                                    }) : null
                            }
                        </div>
                    </div> : null
                }

                <div>
                    {
                        this.state.filterPanelToggle ?
                            <Filters
                                filterState={this.props.filterState}
                                filterData={this.state.filterData}
                                filterAction={this.props.filterAction}
                            /> :
                            null
                    }
                </div>
                <div>
                    <div className="custom-table relative">
                        {/* Heading */}
                        <Heading
                            hideHeader={this.props.hideHeader}
                            headingData={_get(this, 'props.headingData', this.state.headingData)}
                        />

                        {
                            this.props.loader ?
                                <div className="layover">
                                    <div className="loader">
                                        <CircularProgress size={50} />
                                    </div>
                                </div> :
                                null
                        }


                        {
                            _get(this, "props.data", []).length > 0 ?

                                this.populateRows() :

                                <div className="width-100-percent flex-row justify-center">
                                    <div className="pad-20">No Data</div>
                                </div>

                        }

                    </div>

                   {this.props.hidePagination?null: <Pagination
                        onShowSizeChange={this.props.onShowSizeChange}
                        onChange={this.props.onPageChange}
                        total={this.props.total}
                    />}
                </div>
            </div>
        )
    }
}

export default CardTable;