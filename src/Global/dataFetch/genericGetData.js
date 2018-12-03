import _get from 'lodash/get';
import _find from 'lodash/find'
import { getData } from '../../Redux/getAction';
import { APPLICATION_BFF_URL } from '../../Redux/urlConstants'



const genericGetDataFetcher = ({dispatch,url,constant,identifier}) => {
    return dispatch(
            getData(`${APPLICATION_BFF_URL}${url}`, identifier,constant)
        )
}

export default genericGetDataFetcher;