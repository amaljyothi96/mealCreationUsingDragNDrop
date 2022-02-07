import React, { useState } from 'react';
import { connect } from "react-redux";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



function CreateMeal(props) {

    const { meals } = props;

    return (
        <div className='flex columnFlex MealsContainer'>
            <h2>Saved Meals</h2>
            <div className='flex  columnFlex'>
                {meals.length === 0 && <p>No saved meals !</p>}
                {meals.map(((food, index) => {
                    return (
                        <Popup
                            trigger={<button className="foodIcon fontFamily">{food.name}</button>}
                            position="right center"
                            key={index}
                            className="fontFamily"
                        >
                            <h3 className='mealDesc'>{food.name}</h3>
                            <div className='mealDesc'><span className='bold'>Name</span>: {food.name}</div>
                            <div className='mealDesc'><span className='bold'>Type</span>: {food.type}</div>
                            <div className='mealDesc'><span className='bold'>Calorie</span>: {food.calorie}</div>
                            <div className='mealDesc'><span className='bold'>Meal Foods</span>: {food.foods.map((item, index) => {
                                return <p className='mealItem' key={index}>{item.name}{item.description && `  (${item.description})` }</p>
                            })}</div>
                        </Popup>
                    )
                }))}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        meals: state.mealsReducer
    }
}


export default connect(mapStateToProps)(CreateMeal);

