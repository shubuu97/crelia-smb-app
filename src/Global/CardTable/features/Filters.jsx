import React, { Component } from 'react';
import _get from 'lodash/get';

import CheckboxFilter from './FilterTypes/CheckboxFilter';
import SliderFilter from './FilterTypes/SliderFilter';
import TextboxFilter from './FilterTypes/TextboxFilter';
import RadioFilter from './FilterTypes/RadioFilter';

class Heading extends Component {

    constructor() {
        super();
    }

    populateFilters = () => {
        let allData = this.props.filterData
        let filters = []
        allData.map((data, index) => {
            let type = data.type
            let title = data.name
            switch (type) {
                case "checkbox":
                    filters.push(
                        <div className="filter-sub-block">
                            <h3>{title}</h3>
                            <CheckboxFilter data={data} />
                        </div>
                    )
                    break;
                case "radio":
                    
                    filters.push(
                        <div className="filter-sub-block">
                            <h3>{title}</h3>
                            <RadioFilter data={data} />
                        </div>
                    )
                    break;
                case "textbox":
                    filters.push(
                        <div className="filter-sub-block">
                            <h3>{title}</h3>
                            <TextboxFilter data={data} />
                        </div>
                    )
                    break;
                case "slider":
                    filters.push(
                        <div className="filter-sub-block">
                            <h3>{title}</h3>
                            <SliderFilter data={data} />
                        </div>
                    )
                    break;
            }
        })

        return filters
    }

    render() {
        console.log("Filter Data - ", this.props.filterData)
        return (
            <div className="filter-test">
                {this.populateFilters()}
            </div>
        )
    }
}

export default Heading;