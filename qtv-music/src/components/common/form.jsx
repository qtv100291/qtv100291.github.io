import React, { Component } from 'react';
import InputElementType1 from './inputElementType1';
import InputElementType2 from './inputElementType2';
import InputElementType3 from './inputElementType3';
import TextArea from './textArea';
import RadioInput from './radioInput';
import Select from './inputSelect';
import additionalFunctionDom from '../../ultis/additionalFunctionDom';

class Form extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const errors = additionalFunctionDom.checkInput(this.inputCheck); // check and print errors (if any)
        this.setState({ errors, serverError: "" })
        if (additionalFunctionDom.checkIfThereAreAnyError(errors)) return;
        this.doSubmit();
    }

    handleChange = ({currentTarget : input}) => {
      // set state when changing input 
      let data = {...this.state.data};
      data[input.name] = input.value;
      this.setState({data});
      // check all inputs are filled
      if (additionalFunctionDom.checkAreAllInputFilled()) 
        this.setState({ disabled : false })
      else this.setState({ disabled : true })
    }

    handleOnly10Digit = ({currentTarget : input}) => {
      //allow user to type only digit 
      const testRegex = /^\d{0,10}$/;
      if (testRegex.test(input.value)) {
        let data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data});
      }
      else {
        let inputModified = input.value.substring(0, input.value.length - 1);
        let data = {...this.state.data};
        data[input.name] = inputModified;
        this.setState({ data });
      }
    }

    handleChangeSelect = ({currentTarget : input}) => {
      // set state when changing input 
      let data = {...this.state.data};
      data[input.name] = input.value;
      this.setState({data});
      if (input.name === "receiverProvince") {
        this.hanldeDistrict(input.value);
      }
      if (input.name === "receiverDistrict") {
        this.hanldeCommune(input.value);
      }
      // check all inputs are filled
      // if (additionalFunctionDom.checkAreAllInputFilled()) 
      //   this.setState({ disabled : false })
      // else this.setState({ disabled : true })
    }

    handleChangeRadio = ({currentTarget : input}) => {
      let data = {...this.state.data};
      data[input.name] = input.value;
      this.setState({data});
    }

    renderInputType1(name, placeHolder, width , label = "",type = "text") {
        const { data, errors } = this.state;
    
        return (
          <InputElementType1
            type={type}
            name={name}
            value={data[name]}
            width = {width}
            placeholder = {placeHolder}
            label={label}
            error = {errors[name]}
            onChange={this.handleChange}
            
          />
        );
    }
    renderInputType2(name , label = "",type = "text",isOnlyDigit = "false") {
      const { data, errors } = this.state;
      if (isOnlyDigit === "true") 
      return (
        <InputElementType2
          type={type}
          name={name}
          value={data[name]}
          label={label}
          error = {errors[name]}
          onChange={this.handleOnly10Digit}
        />
      )
      else return (
        <InputElementType2
          type={type}
          name={name}
          value={data[name]}
          label={label}
          error = {errors[name]}
          onChange={this.handleChange}
        />
      );
    }
    
    renderInputType3(name , label, placeholder, isOnlyDigit = "false", obligatory = "true", type = "text") {
      const { data, errors } = this.state;
      if (isOnlyDigit === "true") 
      return (
        <InputElementType3
          type={type}
          name={name}
          value={data[name]}
          label={label}
          placeholder={placeholder}
          obligatory={obligatory}
          error = {errors[name]}
          onChange={this.handleOnly10Digit}
        />
      )
      else return (
        <InputElementType3
          type={type}
          name={name}
          value={data[name]}
          label={label}
          placeholder={placeholder}
          obligatory={obligatory}
          error = {errors[name]}
          onChange={this.handleChange}
        />
      );
    }

    renderSelect(name, label, options, idName) {
      const { data, errors } = this.state;
      return (
        <Select
          name={name}
          value={data[name]}
          label={label}
          idName={idName}
          options={options}
          error = {errors[name]}
          onChange={this.handleChangeSelect}
          error={errors[name]}
        />
      );
    }

    renderTextArea(name, label, placeholder, rows) {
      const { data, errors } = this.state;
      return (
        <TextArea
          name={name}
          value={data[name]}
          label={label}
          rows={rows}
          placeholder={placeholder}
          error = {errors[name]}
          onChange={this.handleChange}
        />
      );
    }

    renderTextArea(name, label, placeholder, rows) {
      const { data, errors } = this.state;
      return (
        <TextArea
          name={name}
          value={data[name]}
          label={label}
          rows={rows}
          placeholder={placeholder}
          error = {errors[name]}
          onChange={this.handleChange}
        />
      );
    }

    renderRadioInput(name, id, label, value, autoselect = "false") {
      const { errors } = this.state;
      if (autoselect === "true") {
        return (
          <RadioInput
            name={name}
            value={value}
            label={label}
            id={id}
            defaultChecked={true}
            error = {errors[name]}
            onChange = {this.handleChangeRadio}
          />);
      }
      else 
        return (
            <RadioInput
              name={name}
              value={value}
              label={label}
              id={id}
              error = {errors[name]}
              onChange = {this.handleChangeRadio}
            />);  
        }
}
 
export default Form;