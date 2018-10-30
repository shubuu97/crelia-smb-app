import React from 'react';
import sidebar from './SideBar.js';
/* Global Components*/ 
import DropzoneArea from '../../Global/dropzoneArea';
import decorateWithOnDrop from '../../Global/onDropDecorater';
import { withState, compose } from 'recompose';
import imgquestion from '../../Assets/images/question.png';

let financial = (props) => {
    {
        return (
            <React.Fragment>
                <div className="row">
                <div className="col-sm-12">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                        <h4>Income statements for last two years and YTD</h4>                  
                        <DropzoneArea                    
                            fieldName='preview1'
                            onDrop={props.onDrop}
                            dropzone={props.state.preview1}
                        />
                        </div>
                        <div className="col-sm-4 downlaod-external">
                        <div className="msgicon"><img src={imgquestion} /></div>
                        <p>You need to use predefined templates:</p>
                        <a href="#" > <i class="material-icons">save_alt </i> <span>Download income statement XLSX-template</span></a>
                        </div>
                    </div>
                    <div className="row align-items-center pt-30">
                        <div className="col-sm-6">
                        <h4>Balance sheet common size statement</h4>
                        <DropzoneArea                     
                            fieldName='preview2'
                            onDrop={props.onDrop}
                            dropzone={props.state.preview2}
                        />
                        </div>
                        <div className="col-sm-4 downlaod-external">
                        <a  href="#"> <i class="material-icons">save_alt </i> <span>Download balance sheet  common size statement XLSX-template</span></a>
                        </div>
                    </div>
                </div>
                </div>
            </React.Fragment>
        )
    }
}

let state = withState('state', 'setState', '')

export default compose(
    state,
    decorateWithOnDrop,
    sidebar,

)(financial);



