import {withState,withHandlers,compose} from 'recompose';
import React from 'react';


let RTest =  (props)=>
{
    console.log(props);
return(
<input onChange={props.setText} value={props.textFieldValue}/>)
}

RTest = compose(
    withState('textFieldValue','setHandler',''),
    withHandlers({
    setText:props=>event=>props.setHandler(event.target.value),

    })
)(RTest)


export default RTest;