import React from 'react';
import { connect } from 'react-redux';
import { RootState } from './redux/store';
import files from './redux/reducer/files'


interface StateProps {
    fileOne: string[][],
}

interface DispatchProps {
    addFile: (f: string) => void
}

const FormOne = (props: StateProps & DispatchProps) => {
    
    
    const onFileUpload = () => {
        const fileSelector: any = document.querySelector('#myFile1')
        const file = fileSelector.files[0]
        const reader = new FileReader()
        reader.onload = event => {
            if (typeof event?.target?.result === 'string') {
                {props.addFile(event?.target?.result)}
            }
        }
        reader.readAsText(file)
    }

    return(
        <div>
            <form action="/action_page.php">
            <label>Upload trips</label>
            <input type="file" id="myFile1" name="filename" onChange={onFileUpload}/>
            </form>
        </div>
    )
}

export default connect<StateProps, DispatchProps, {}, RootState>(
    (state) => ({
        fileOne: state.files.fileOne
    }),
    (dispatch) => ({
        addFile: (f: string) => dispatch(files.actions.addFileOne(f))
    })
)(FormOne);