import React from 'react';
/* Lodash Imports */
import _get from 'lodash/get';
/* Material components import */

/* Redux Imports */


class NewComponent extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        let keyValue = _get(this, 'props.data.key')
        let data = _get(this, 'props.data')
        console.log(data, "New Component Data")
        return (
            <div>
                The key is {keyValue}
            </div>
        );
    }
}

export default NewComponent;