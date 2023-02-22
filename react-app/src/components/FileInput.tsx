import * as React from "react";

export type FileInputProps = {
    onUploadFile?: (file?: File) => void;
    title?: string;
}

class FileInput extends React.Component<FileInputProps> {
    private readonly fileInput: React.RefObject<HTMLInputElement>;

    constructor(props: any) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    componentDidMount() {
    }
    componentWillUnmount() {
    }

    handleChange(selectorFiles: FileList) {
        console.log(selectorFiles);
    }

    handleSubmit(event: any) {
        event.preventDefault();

        const file = this.fileInput.current!.files![0];
        if (this.props.onUploadFile) {
            this.props.onUploadFile(file);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    {this.props.title}:&nbsp;&nbsp;&nbsp;
                </label>
                <label>
                    选择上传文件:
                    <input type="file" ref={this.fileInput}/>
                </label>
                <button type="submit">上传</button>
            </form>
        );
    }
}

export default FileInput;
