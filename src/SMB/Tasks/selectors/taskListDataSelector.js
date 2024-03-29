import { createSelector } from 'reselect';
import _get from 'lodash/get';
import moment from 'moment';
const tableDataSelector = createSelector(
    state => _get(state, "TaskList.lookUpData.rows", []),

    TaskList => TaskList.map((data, index) => {
        let obj = {
            status: {
                content: data.taskStatus,
                status: data.taskStatus,
            },
            InvestorName: `${_get(data, 'investorId.legalName')}`,
            Time:moment(_get(data, 'modifiedTimestamp')).format('DD-MM-YYYY'),
            RequestedFieldsCount:_get(data,'requestedFields').length
        }
        return obj
    })

)

export { tableDataSelector}