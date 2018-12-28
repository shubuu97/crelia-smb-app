import  React  from 'react';
import CardTable from '../../../Global/CardTable/CardTable';
import genericPostData from '../../../Global/dataFetch/genericPostData';
import _get from 'lodash/get';

class TaskList extends React.Component
{

  constructor(props)
  {
      super(props);
      this.state = {
          Loading:false
      }
  }  

markComplete =(data,index)=>
{
 let reqObj = {
     task: _get(this.props,`listData[${index}].id`,'')
 };
 this.setState({Loading:true})
genericPostData({
    dispatch:this.props.dispatch,
    reqObj,
    url:'/api/CompleteFieldAccessReqTask',
    constants:{
        init:'CompleteFieldAccessReqTask_init',
        success:'CompleteFieldAccessReqTask_success',
        error:'CompleteFieldAccessReqTask_error'
    },
    identifier:'CompleteFieldAccessReqTask',
    successText:'Task Marked As Complete Succesfully',
    successCb:()=>this.setState({Loading:false}),
    errorCb:()=>this.setState({Loading:false})
})
}
declineTask = (data,index)=>
{
    let reqObj = {
        task: _get(this.props,`listData[${index}].id`,'')
    };
    this.setState({Loading:true})
   genericPostData({
       dispatch:this.props.dispatch,
       reqObj,
       url:'/api/DeclineFieldAccessReqTask',
       constants:{
           init:'DeclineFieldAccessReqTask_init',
           success:'DeclineFieldAccessReqTask_success',
           error:'DeclineFieldAccessReqTask_error'
       },
       identifier:'DeclineFieldAccessReqTask',
       successText:'Task Declined Succesfully',
       successCb:()=>this.setState({Loading:false}),
       errorCb:()=>this.setState({Loading:false})
   })
}
editTask = (data,index)=>
{

}

render()
{
    return (
        <div>
              <CardTable
                    title="Your Tasks"
                    // filterData={this.this.props.filterData}
                    // filterAction={this.fetchingFilterQueryData}
                    // filterState={this.state.query}
                    loader={this.state.Loading}
                    menuActions={[{
                        Title: 'Mark As Complete',
                        actionEvent:this.markComplete,
                    },
                    {
                        Title: 'Decline',
                        actionEvent:this.declineTask
                    }
                    ]}
                    soloActions={[{
                        Title: 'Edit',
                        className: 'edit-icon flex-row',
                        actionEvent: this.editTask
                    }]}
                    headingData={[
                        'Task Status',
                        'Investor Id',
                        'Date Created',
                        'Requested Field Count',
                        'Actions'
                    ]}
                    data={this.props.TableData}
                    // actions={true}
                    // isExtended={true}
                    filter={false}
                    // onShowSizeChange={this.onShowSizeChange}
                    // onPageChange={this.onPageChange}
                    // chooseColor={this.chooseColor}
                    // extendedComponent={
                    //     {
                    //         component: OffersContainer
                    //         , actionEvent: this.extendedComponentAction
                    //     }
                    // }

                    // total={this.this.props.totalRows}
                    // openOfferModal={this.openOfferModal}
                    // headingButtons={
                    //     [
                    //         { Title: 'Create Request', className: "mb-10 ", actionEvent: () => this.this.props.history.push('/LoanRequest/SelectLoanType') },
                    //     ]
                    // }

                />
    </div>)
}
}
export default TaskList;