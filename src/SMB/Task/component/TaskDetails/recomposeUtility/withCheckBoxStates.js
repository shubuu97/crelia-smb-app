import { withHandlers } from "recompose";

const handleChange = props => name => event => {
    debugger;
    let allFields = { ...props.fields };
    allFields[name] = event.target.checked
    props.FieldAccessReqTask(allFields);
    return {[name]: event.target.checked };
};

const withCheckBoxStates = withHandlers({handleChange});

export default withCheckBoxStates;