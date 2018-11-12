import React from 'react';
import Dropzone from 'react-dropzone';
import './globalStyles/dropzone.less'

let dropzoneArea = (props)=> {

    return(
        <React.Fragment>
            <span className='dropzoneTitle'>
                {props.title}
            </span>
            <Dropzone 
                onDrop={(accept,reject)=>props.onDrop(accept,reject,props.fieldName)}
                className='dropzone'
            >
                {
                    props.dropzone== undefined || '' ?
                    <div className='dropzoneTextarea'>
                        <svg style={{ width: '40px', height: '40px' }} viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"/>
                        </svg>
                        <span className='dropzoneMainText'>Drag and drop your files here or click to select files to upload.</span>
                        <span>Available File Formats: XSLS, CSV</span>
                        <span>maximum size 15mb</span>
                    </div>
                    
                    :
                    
                    <div className='dropzoneImgarea'>
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        style={{ width: '50px', height: '50px' }}
                        viewBox="0 0 24 24"
                        className='dropzoneImg'>
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"/>
                        </svg> 
                        <span>{props.dropzone.name || ''}</span>
                    </div>
                }
            </Dropzone>
        </React.Fragment>
    )
}

export default dropzoneArea;