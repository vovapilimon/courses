import React,{Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/AppAction'
import FormSelect from '../FormSelect'
import ItemList from '../ItemList/ItemList'
import styles from './style.module.css'

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      search : "",
    }
  }

  render(){
    const {
      options,
      byId,
      allIds,
      filter,
      isBonus
    } = this.props;
    const {filterParams} = this.props.actions;
    const {subjects, genres, grades} = options;
    return (
      <div className="container">
        <div className={`h1 text-center ${styles.header}`}>
            Витрина
            <button
              className={styles.buttonApp}
              type="button"
              onClick ={this.onCheckBonusRub}>рубли/бонусы</button>
        </div>

        <form >
          <div className="form-group row">
            <FormSelect keyElement = "subject" options = {subjects} onClickfilterParams ={filterParams} />
            <FormSelect keyElement = "genre" options = {genres} onClickfilterParams ={filterParams}/>
            <FormSelect keyElement = "grade"options = {grades} onClickfilterParams ={filterParams}/>
            <div className="col-12 col-sm-12 col-md-3">
              <div className={`form-group ${styles.search}`}>
                  <input
                    type="search"
                    className="form-control"
                    onChange={this.handleChange}
                    onKeyPress = {this.onClick}
                    value={this.state.search}
                    placeholder="Поиск"
                  />
                  <button
                    className={styles.coursesFormSearchBtn}
                    type="submit"
                    title="Найти"
                    onClick ={this.onClick}
                  />
              </div>
            </div>
          </div>
        </form>
        <h2 className="text-center">Результаты поиска:</h2>

        <ItemList
          allIds = {allIds}
          byId = {byId}
          filter = {filter}
          options = {options}
          isBonus = {isBonus}
        />
      </div>
    )
  }

  componentWillMount(){
    const {loadParams} = this.props.actions;
    loadParams();
  }

  handleChange = (event)=>{
    this.setState({search: event.target.value});
  }

  onClick = (event)=>{
      const {onSearch} = this.props.actions;
      onSearch(this.state.search);
  }

  onCheckBonusRub = ()=>{
    const {onIsBonus} = this.props.actions;
    const {isBonus} = this.props;
    onIsBonus(!isBonus);
  }

}

function mapStateToProps (state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
