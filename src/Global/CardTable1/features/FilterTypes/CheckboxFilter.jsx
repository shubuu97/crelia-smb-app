import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _get from 'lodash/get';
/* Material Imports*/
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
/* Redux Imports */


class CheckboxFilter extends Component {

    constructor() {
        super();
        this.state = {
            
        }
    }

    componentDidMount() {
       
    }

    populateCheckbox = () => {
        let checboxArr = _get(this, "props.data.values", [])
        let filterCheckbox = [];
        filterCheckbox = checboxArr.map((data, index) => {
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            key={index}
                            checked={this.state[`check${index}`]}
                            onChange={this.handleChange(`check${index}`)}
                            value={`check${index}`}
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
            <div className="filter-list">
                {this.populateCheckbox()}
            </div>
        )
    }
}

export default CheckboxFilter;