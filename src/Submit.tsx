import React from 'react';
import { connect } from 'react-redux';
import { RootState } from './redux/store';
import files, {DriverPay} from './redux/reducer/files'

interface StateProps {
    payPerDriver: DriverPay,
    unfoundLoads: string[]
}

interface DispatchProps {
    calculate: () => void;
}

const Submit = (props: StateProps & DispatchProps) => {
    
    return(
        <div>
            <input onClick={props.calculate} type='submit'></input>
            <p>Payment amount: {JSON.stringify(props.payPerDriver)}</p>
            <p>Unfound loads: {JSON.stringify(props.unfoundLoads)}</p>
        </div>
    )
}

export default connect<StateProps, DispatchProps, {}, RootState>(
    (state) => ({
        payPerDriver: state.files.payPerDriver,
        unfoundLoads: state.files.unfoundLoads
    }),
    (dispatch) => ({
        calculate: () => dispatch(files.actions.calculate())
    })
)(Submit);