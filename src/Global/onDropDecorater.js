import {withHandlers} from 'recompose';
import { connect } from 'tls';
import {postData} from '../Redux/postAction'
import showMessage from '../Redux/toastAction'
const decorateWithOnDrop = withHandlers({
    onDrop:(props)=>(accept,reject,name)=>{
        console.log(accept,"accept is here");
        let formData = new FormData();
        formData.append('file', accept[0])
        formData.append('mediaType', 'customer')
        formData.append('mediaTypeId', '1234567')
        props.dispatch(postData(`http://13.233.38.55:4005/api/media`, formData, 'fileUpload',{
            init:'File_Upload_init',
            success:'File_Upload_Success',
            error:'File_Upload_Error'

        }))
            .then((data) => {
                props.dispatch(showMessage({ text: 'Upload success', isSuccess: true }));
                setTimeout(() => {
                    props.dispatch(showMessage({ text: '', isSuccess: true }));

                }, 6000)
            })
            .catch((error) => {
                console.log(error,"error")
                props.dispatch(showMessage({ text: 'Some error occured', isSuccess: false }));
                setTimeout(() => {
                 props.dispatch(showMessage({ text: '', isSuccess: true }));

                }, 6000)
            })
        props.setState({...props.state,[name]:accept[0]})
    }
})

export default decorateWithOnDrop;
