import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
/* Material Imports*/
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
/* Redux Imports */


class CheckboxFilter extends Component {

    constructor() {
        super();
        this.state = {
            selectedValue: "1"
        }
    }

    populateCheckbox = () => {
        let checboxArr = _get(this, "props.data.values", [])
        let filterCheckbox = []
        filterCheckbox = checboxArr.map((data, index) => {
            return (
                <FormControlLabel
                    control={
                        <Radio
                            checked={this.state.selectedValue === `${index}`}
                            onChange={this.handleChange}
                            value={`${index}`}
                            name="radio-button-demo"
                            aria-label={`${index}`}
                        />
                    }
                    label={data}
                />
            )
        })

        return filterCheckbox
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    }


    render() {
        console.log("Filter Data Type - ", this.props.data.type, this.props.data)
        return (
            <div className="mt-10">
                {this.populateCheckbox()}
            </div>
        )
    }
}

export default CheckboxFilter;