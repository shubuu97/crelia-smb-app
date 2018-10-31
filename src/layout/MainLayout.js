import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Header from './header';
import Snackbar from '@material-ui/core/Snackbar';
import _get from 'lodash/get'


const styles = theme => ({
    failure: {
      background: 'red',
      fontSize: '1rem'
    },
    success: {
      background: 'green',
      fontSize: '1rem'
    }
  });
  const priceFilterObject = {
    lessThan50: false,
    from50To100: false,
    from100To200: false,
    above200: false
  }


class MainLayout extends Component {


    render() {
        let  {classes} = this.props;
        console.log(this.props,"here");
        // if(!localStorage.getItem('authToken'))
        // this.props.history.push('/')

        return (
            <div className="main-layout master">
                <div>
                <Header history={this.props.history}/>
                </div>
                <div className="main-content">
                {this.props.companyStatus=='PENDING_APPROVAL'?<div>Your details has been sent for admin approval please wait for further action.. </div>:null}
                    {this.props.children}
                </div>
                <div>
                    <span>Footer</span>
                </div>
                <div> {this.props.message.text && <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    open={true}
                    autoHideDuration={6000}
                    onClose={() => { }}
                    ContentProps={{
                      'aria-describedby': 'message-id',
                      classes: {
                        root: this.props.message.isSuccess ? classes.success : classes.failure
                      }
                    }}
                    message={<span id="message-id">{this.props.message.text}</span>}
                  />}
              
                  </div>
            </div>
        )
    }
}

function mapStateToProps(state)
{

let message = state.ShowToast.message;
let companyStatus = _get(state,'BasicInfo.lookUpData.tempCompany.status');
localStorage.setItem('companyStatus',companyStatus);
if(companyStatus=="PENDING_APPROVAL")
{
  localStorage.setItem('disabled',true)
}
return {message,companyStatus}
}

export default connect(mapStateToProps)(withStyles(styles)(MainLayout));
