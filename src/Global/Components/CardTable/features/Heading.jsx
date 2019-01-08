import React, { Component } from 'react';
import _get from 'lodash/get';
/* Material Imports*/
import LinearProgress from '@material-ui/core/LinearProgress';
/* Redux Imports */
import { connect } from 'react-redux';

class Heading extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        // Specific Task Modal case
        if (!this.props.hideHeader)
            var height = document.getElementById('table-heading').clientHeight;
        else
            var height = 0;
        this.setState({
            top: height
        })
    }

    populateHeading = () => {
        let data = this.props.headingData
        let dataArr = []
        for (let i = 0; i < data.length; i++) {
            dataArr.push(<div className="data-col"><h3>{data[i]}</h3></div>)
        }
        return (
            <React.Fragment>
                {dataArr}
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className='table-head sticky' style={{ top: this.state.top }}>
                <div className="heading-part" >
                    {this.populateHeading()}
                </div>
                {
                    this.props.loader ? 
                    <LinearProgress 
                        color='primary'
                    /> :
                    null
                }
                
            </div>
            
        )
    }
}

export default Heading;