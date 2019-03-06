import React, {Component} from 'react'
import styles from './style.module.css'

export default class Item extends Component {
  render(){
    const {data, isBonus} = this.props;
    const {subject, grade, genre} = data;
    const url = `https://www.imumk.ru/svc/coursecover/${data.courseId}`;

    let gradeLocal = grade.split(";");
    let gradeStr = gradeLocal.length > 1 ? `${gradeLocal[0]}-${gradeLocal[gradeLocal.length - 1]}` : gradeLocal[0];
    return(
      <div className={styles.col} >
        <img src={url} className={styles.img} alt="..." />
        <div className = {styles.blockInfo}>
          <div className = {styles.blockSubject}>{subject}</div>
          <div className = {styles.blockGrade}>{gradeStr + " класс"}</div>
          <div className = {styles.blockGenre}>{genre}</div>
          <div>
            <button type="button" className = {styles.buttonPrice} >{isBonus? data.priceBonus + " бонусов" : data.price + " рублей"}</button>
          </div>
        </div>
      </div>
    )
  }
};
