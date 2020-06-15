import React from 'react';
import { connect } from 'react-redux';
import { RootState } from './redux/store';
import files from './redux/reducer/files'

interface StateProps {
    fileTwo: string[][]
}

interface DispatchProps {
    addFile: (f: string) => void
}

const FormTwo = (props: StateProps & DispatchProps) => {
    const onFileUpload = () => {
        const fileSelector: any =document.querySelector('#myFile2')
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
            <label>Upload invoice</label>
            <input type="file" id="myFile2" name="filename" onChange={onFileUpload}/>
            </form>
        </div>
    )
}

export default connect<StateProps, DispatchProps, {}, RootState>(
    (state) => ({
        fileTwo: state.files.fileTwo
    }),
    (dispatch) => ({
        addFile: (f: string) => dispatch(files.actions.addFileTwo(f))
    })
)(FormTwo);