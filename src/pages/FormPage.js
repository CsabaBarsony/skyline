import React, { Component } from 'react';
import {
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  Checkbox,
  HelpBlock,
} from 'react-bootstrap/lib';

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); // eslint-disable-line

class FormPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: '',
        validation: null,
      },
      email: {
        value: '',
        validation: null,
      },
      description: {
        value: '',
        validation: null,
      },
      terms: {
        checked: false,
        validation: null,
      },
      file: {
        path: '',
        validation: null,
      }
    };
  }

  onNameChange(e) {
    const validation = e.target.value.length ? 'success' : 'error';

    this.setState({
      name: {
        value: e.target.value,
        validation,
      },
    });
  }

  onEmailChange(e) {
    this.setState({
      email: {
        value: e.target.value,
        validation: emailRegex.test(this.state.email.value) ? 'success' : 'error',
      },
    });
  }

  onDescriptionChange(e) {
    this.setState({
      description: {
        value: e.target.value,
        validation: e.target.value.length ? 'success' : 'error',
      },
    });
  }

  toggleTerms() {
    this.setState({
      terms: {
        checked: !this.state.terms.checked,
        validation: !this.state.terms.checked ? 'success' : 'error',
      },
    });
  }

  onTermsBlur(e) {
    this.setState({
      terms: {
        checked: this.state.terms.checked,
        validation: e.target.checked ? 'success' : 'error',
      },
    });
  }

  onFileSelected(e) {
    this.setState({
      file: {
        path: e.target.value,
        validation: e.target.value.length ? 'success' : 'error',
      },
    })
  }

  validateForm() {
    return this.state.name.validation === 'success' &&
      this.state.email.validation === 'success' &&
      this.state.description.validation === 'success' &&
      this.state.terms.validation === 'success' &&
      this.state.file.validation === 'success';
  }

  render() {
    return <div>
      <h2>Form Page</h2>
      <form>

        <FormGroup
          controlId="inputName"
          validationState={this.state.name.validation}
        >
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.name.value}
            placeholder="Enter name"
            onChange={e => this.onNameChange(e)}
            onBlur={e => this.onNameChange(e)}
          />
          <FormControl.Feedback />
          {this.state.name.validation === 'error' && <HelpBlock>Name is required</HelpBlock>}
        </FormGroup>

        <FormGroup
          controlId="inputEmail"
          validationState={this.state.email.validation}
        >
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            value={this.state.email.value}
            placeholder="Enter email"
            onChange={e => this.onEmailChange(e)}
            onBlur={e => this.onEmailChange(e)}
          />
          <FormControl.Feedback />
          {this.state.email.validation === 'error' && <HelpBlock>Valid e-mail address is required</HelpBlock>}
        </FormGroup>

        <FormGroup
          controlId="inputDescription"
          validationState={this.state.description.validation}
        >
          <ControlLabel>Description</ControlLabel>
          <FormControl
            componentClass="textarea"
            value={this.state.description.value}
            placeholder="Enter description"
            onChange={e => this.onDescriptionChange(e)}
            onBlur={e => this.onDescriptionChange(e)}
          />
          <FormControl.Feedback />
          {this.state.description.validation === 'error' && <HelpBlock>Description is required</HelpBlock>}
        </FormGroup>

        <FormGroup
          controlId="inputDescription"
          validationState={this.state.terms.validation}
        >
          <ControlLabel>Description</ControlLabel>
          <Checkbox
            readOnly
            checked={this.state.terms.checked}
            onChange={() => this.toggleTerms()}
            onBlur={e => this.onTermsBlur(e)}
            validationState={this.state.terms.validation}
          >
            Accept terms and conditions
          </Checkbox>
          <FormControl.Feedback />
          {this.state.terms.validation === 'error' && <HelpBlock>You must accept terms and conditions</HelpBlock>}
        </FormGroup>

        <FormGroup
          controlId="inputFile"
        >
          <ControlLabel>Upload image</ControlLabel>
          <FormControl
            type="file"
            value={this.state.file.path}
            placeholder="Enter name"
            onChange={e => this.onFileSelected(e)}
            onBlur={e => this.onFileSelected(e)}
            accept="image/*"
          />
          <FormControl.Feedback />
        </FormGroup>

        <Button
          type="submit"
          disabled={!this.validateForm()}
        >
          Submit
        </Button>

      </form>
    </div>;
  }
}

export default FormPage;
