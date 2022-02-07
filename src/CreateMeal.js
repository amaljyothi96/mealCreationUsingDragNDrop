import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from "react-redux";
import FoodIcon from './FoodIcon';
import * as actions from './redux/actions'
import { calorieList } from "./data";
import { bindActionCreators } from "redux";


function CreateMeal(props) {

    const { foods } = props;
    const [foodList, setFoodList] = useState(foods);
    const [isDisabled, setIsDisabled] = useState(true);
    const [meal, setMeal] = useState([]);

    const handleFoodDrag = (result) => {
        const foods = [...foodList];
        const meals = [...meal];
        meals.length === 0 ? setIsDisabled(true) : setIsDisabled(false)
        if (!result.destination) return;
        if (result.source.droppableId === "food") {
            if (result.source.droppableId === result.destination.droppableId) return;
            if (meals.length === 3) {
                alert("Oops! It's the maximum I can hold.")
                return
            }
            const [reorderedItem] = foods.splice(result.source.index, 1);
            setFoodList(foods);
            meals.splice(result.destination.index, 0, reorderedItem);
            setMeal(meals);
            setIsDisabled(false);
        }
        else {
            if (result.source.droppableId === result.destination.droppableId) return;
            meals.length === 1 && setIsDisabled(true);
            const [reorderedItem] = meals.splice(result.source.index, 1);
            setMeal(meals);
            foods.splice(result.destination.index, 0, reorderedItem);
            setFoodList(foods);
        }
    }

    const resetForm = (elements) => {
        setMeal([]);
        setFoodList(foods);
        elements.name.value = ''
        elements.veg.checked = false;
        elements.nonveg.checked = false;
        elements.calorie.value = '';
        setIsDisabled(true)
    }

    const handleSubmit = (event) => {
        const elements = event.target.elements;
        const foodItems = meal.map(value => { return { name: value.name, description: elements[value.name].value } })
        let newMeal = {
            name: elements.name.value,
            type: elements.veg.checked ? "Veg" : "Non Veg",
            calorie: elements.calorie.value,
            foods: foodItems

        }
        event.preventDefault();
        resetForm(elements);
        props.addMeal(newMeal);
        alert('Meal Created Successfully');
    }

    const renderfoodList = () => {
        return (
            <div className='flex columnFlex container'>
                <h2>Food List</h2>
                <Droppable droppableId="food">
                    {(provided) => (
                        <ul className="foodList"  {...provided.droppableProps} ref={provided.innerRef}>
                            {foodList.map(({ id, name }, index) => {
                                return (
                                    <Draggable key={id} draggableId={name} index={index}>
                                        {(provided) => (
                                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <FoodIcon name={name} />
                                            </li>)}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
        )
    }

    const renderCalorieList = () => {
        return (
            calorieList.map((value) => <option key={value} value={value}>{value}</option>)
        )
    }

    const renderForm = () => {
        return (
            <form className='form' onSubmit={handleSubmit}>
                <h3 className='createTitle'>Create Meal here</h3>
                <div className='detailEl'><span>Name : </span><input type="text" required placeholder='Type here...' id="name" /></div>
                <div className='detailEl'><span>Type : </span><input type="radio" name="type" value="veg" id="veg" required /><span>Veg </span><input type="radio" name="type" value="nonveg" id="nonveg" required /><span>Non Veg </span></div>
                <div className='detailEl'>
                    <span>Calorie : </span>
                    <select id="calorie" required>
                        <option value="">---Select Calorie---</option>
                        {renderCalorieList()}
                    </select>
                </div>
                <Droppable droppableId="meal">
                    {(provided) => (
                        <ul className="mealList"  {...provided.droppableProps} ref={provided.innerRef}>
                            {meal.map(({ id, name }, index) => {
                                return (
                                    <Draggable key={id} draggableId={name} index={index}>
                                        {(provided) => (
                                            <li className='flex list' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <FoodIcon name={name} /> <textarea rows={2} className='desc' id={name} />
                                            </li>)}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
                {meal.length === 0 && <p>Drop your food items here !</p>}
                <input disabled={isDisabled} className='saveBtn' type='submit' value="Save" />
            </form>
        )
    }


    return (
        <DragDropContext onDragEnd={handleFoodDrag}>
            <div className='flex'>
                {renderfoodList()}
                {renderForm()}
            </div>
        </DragDropContext>
    );
}

function mapStateToProps(state) {
    return {
        foods: state.foodListReducer,
        meals: state.mealsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMeal);

