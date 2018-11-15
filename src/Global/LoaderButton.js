import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const LoaderButton = (props)=>
{
    return(
        <Button
        type={props.type}
        fullWidth={props.fullWidth}
        disabled={props.isFetching}
        variant={props.variant}
        color={props.color}
        className={props.className}
      >
        {props.isFetching ? <CircularProgress size={24} /> : props.children}
      </Button>
    )
}

export default LoaderButton;