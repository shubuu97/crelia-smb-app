import get from 'lodash/get';


const getBasicInfoData = state => get(state, 'BasicInfo');


export{
    getBasicInfoData
}
