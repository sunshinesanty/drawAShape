import * as React from 'react';
import { Payload } from '../common/interfaces';

class InputForm extends React.Component<{ onSubmitData: (input: Payload) => void }, Payload> {
    constructor(props: any) {
        super(props);
        this.state = { xUnit: 0, yUnit: 0, zUnit: 0 };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        let value: any = target.value;
        const name = target.id;
        this.setState({ [name]: value });

        if (isNaN(parseInt(value, undefined))) {
            event.target.style.border = '1px solid #ff0000';
        } else {
            event.target.style.border = '';
        }
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        this.props.onSubmitData(this.state);
    }

    render() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <label>X Units:</label>
                    <input
                        id="xUnit"
                        type="text"
                        value={this.state.xUnit}
                        className="form-control"
                        title="Only numbers allowed"
                        maxLength={4}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                    <label>Y Units:</label>
                    <input
                        id="yUnit"
                        type="text"
                        value={this.state.yUnit}
                        className="form-control"
                        title="Only numbers allowed"
                        maxLength={4}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div>
                    <label>Z Units:</label>
                    <input
                        id="zUnit"
                        type="text"
                        value={this.state.zUnit}
                        className="form-control"
                        title="Only numbers allowed"
                        maxLength={4}
                        onChange={this.handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-default" onClick={this.onSubmit}>Submit</button>
            </form>
        );
    }
}

export default InputForm;