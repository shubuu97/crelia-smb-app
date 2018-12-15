import React, { Component } from 'react';
import History from './History'
import _get from 'lodash/get';

 export default class Histories extends Component {
    constructor(props) {
        super(props);
        this.state={
          
        }

    }

   render() {
      let ProfileHistoryData = _get(this.props,'ProfileHistoryData');
    let HistoryView =   ProfileHistoryData.map((ProfileHistory,index)=>
{
    return <History
    dispatch={this.props.dispatch}
     key={index}
    ProfileHistory={ProfileHistory}/>
})

   return  (
       <div>
          {HistoryView}
       </div>

   )
    }

}
