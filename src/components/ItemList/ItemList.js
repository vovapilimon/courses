import React, {Component} from 'react'
import { connect } from 'react-redux'
import Item from '../Item/Item'
import styles from './itemList.module.css'

class ItemList extends Component {
  render(){
    const {byId, newData, isBonus} = this.props;
    const items = newData.map((item)=>{
      return <Item key = {item} data = {byId[item]} isBonus = {isBonus}/>;
    });
    return(
      <div className = {styles.row}>
        {items}
      </div>
    )
  }
};

function mapStateToProps (state) {
  const {byId, allIds, filter, options, isBonus} = state;
  const {subject, genre, grade, search} = filter;
  const {subjects, genres, grades} = options;

  const newData = allIds.filter((item)=>{
    const element = byId[item];
    if(subjects[0] === subject || subject === element.subject)
    {
      if(genres[0] === genre || genre === element.genre)
      {
        if(grades[0] === grade || element.grade.indexOf(grade) !== -1)
        {
          const gradeLocal = element.grade;
          let gradeStr = gradeLocal.length > 1 ? `${gradeLocal[0]}-${gradeLocal[gradeLocal.length - 1]}` : gradeLocal[0];
          gradeStr += " класс";
          if(element.subject.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            element.genre.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
            gradeStr.toLowerCase().indexOf(search.toLowerCase()) !== -1)
            return true;
        }
      }
    }
    return false;
  });
  return {
    byId: byId,
    newData: newData,
    isBonus: isBonus
  };
}

export default connect(mapStateToProps)(ItemList)
