import React, { Component } from 'react';
import _get from 'lodash/get'

function TabHoc(WrappedComponent) {
    return class Tab extends Component {
        constructor(props) {
            super();
            
        }
        handleRoute = (type,active) => {
            console.log(this.props, "props is here");
         
            
            if (this.props.location.pathname != `/${type}`)
                this.props.history.push(`/${type}`);
        }
        render() {
           let classActiveRegister =  _get(this.props,'location.pathname',"")=="/register"?true:false
            return (
                <div>
                    <ul className="login-tabs" >
                        <li className={!classActiveRegister?'active':null} onClick={() => this.handleRoute('','login')}>Login</li>
                        <li className={classActiveRegister?'active':null}    onClick={() => this.handleRoute('register','register')}>Register</li>

                    </ul>
                    <div>
                        <WrappedComponent {...this.props} />
                    </div>
                </div>

            )
        }
    }
}

export default TabHoc;