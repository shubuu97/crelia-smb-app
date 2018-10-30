import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import sidebar from './SideBar.js';
import DropzoneButton from '../../Global/dropzoneButton'
import decorateWithOnDrop from '../../Global/onDropDecorater';
import { withState } from 'recompose';



class Legal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props, 'props is here')
        return (
            <div>
                <div className="row">
                    <div className="col-sm-4">
                        <h4>Registration Certificate</h4>
                        <img className="img-fluid  pt-15 pb-15" src="https://image.freepik.com/free-vector/certificate-template-design_1262-2535.jpg" />
                        <br />
                        <DropzoneButton
                            fieldName='rc'
                            name="Change File"
                            onDrop={this.props.onDrop} />
                    </div>
                    <div  className="col-sm-4">
                        <h4>Organization Chart</h4>
                        <img className="img-fluid pt-15 pb-15" src="https://image.freepik.com/free-vector/certificate-template-design_1262-2535.jpg" />
                        <br />
                        <DropzoneButton
                            fieldName='chart'
                            name="Change File"
                            onDrop={this.props.onDrop} />
                    </div>
                    <div  className="col-sm-4">
                        <h4>Tax Id</h4>
                        <img  className="img-fluid  pt-15 pb-15" src="https://image.freepik.com/free-vector/certificate-template-design_1262-2535.jpg" />
                        <br />
                        <DropzoneButton
                            fieldName='taxId'
                            name="Change File" onDrop={this.props.onDrop} />
                    </div>

                </div>
            </div>
        )
    }
}
let state = withState('state', 'setState', '')


export default state(decorateWithOnDrop(sidebar(Legal)));



