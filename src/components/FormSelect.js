import React,{Component} from 'react'

export default class FormSelect extends Component {
  render(){
    const {options} = this.props;
    const data = options.map((item)=> <option key={item}>{item}</option>);
    return(
      <div className="col-12 col-sm-4 col-md-3">
        <select className="form-control" onChange = {this.onSelectOption}>
          {data}
        </select>
      </div>
    )
  }

  onSelectOption = (event)=>{
    const  {keyElement, onClickfilterParams} = this.props;
    onClickfilterParams(keyElement, event.target.value);
  }

}
