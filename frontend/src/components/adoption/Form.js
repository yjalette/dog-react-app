import React from 'react';

const icons = {
    good_with_children: "fa fa-child",
    good_with_cats: "fas fa-cat",
    good_with_dogs: "fas fa-dog"
}

const environment = ['good_with_children', 'good_with_cats', 'good_with_dogs'];

const colors = [
    "Agouti",
    "Black",
    "Blue / Gray",
    "Brown / Chocolate",
    "Cream",
    "Lilac",
    "Orange / Red",
    "Sable",
    "Silver Marten",
    "Tan",
    "Tortoiseshell",
    "White"
]

const Form = ({ handleSubmit, handleEnvironmentChange, handleChange, inputs, filter, myDivToFocus, handleClick, handleCancel, reset }) => {

    return (
        <>
            <div className="adoption-filter-wrapper">
                {/* <i onClick={handleClick} className={filter ? 'none' : 'fa fa-caret-down adoption-filter-btn'}><span>sort</span></i> */}
                <i onClick={handleClick} className={filter ? 'none' : 'fa fa-caret-down adoption-filter-btn'}><span>filter</span></i>
            </div>
            {filter && <form className="adoption_form" onSubmit={handleSubmit} ref={myDivToFocus}>
                <div className="input-wrapper">
                    <i className="fa fa-close" onClick={handleCancel}></i>
                </div>
                <div className="input-wrapper">
                    <label>gender:</label>
                    <select name="gender" value={inputs.gender} onChange={handleChange}>
                        <option value="male" name="male">male</option>
                        <option value="female" name="female">female</option>
                    </select>
                </div>
                <div className="input-wrapper">
                    <label>breed:</label>
                    <input value={inputs.breed} name="breed" onChange={handleChange} />
                </div>
                <div className="input-wrapper environment_wrapper">
                    <label>environment:</label>
                    <div className="environment_wrapper">
                        {environment.map(option => (
                            <div key={option} >
                                <i className={icons[option]}></i>
                                <input type="checkbox" onChange={handleEnvironmentChange} value={inputs.option} name={option} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="input-wrapper">
                    <label>color:</label>
                    <select name="color" value={inputs.color} onChange={handleChange}>
                        {colors.map(color => (
                            <option key={color} value={color} name="colors">{color}</option>
                        ))}
                    </select>
                </div>
                <div className="input-wrapper">
                    <label>zipcode:</label>
                    <input value={inputs.location} name="location" onChange={handleChange} />
                </div>
                {/* <div className="input-wrapper">
                    <label>sort by:</label>
                    <select name="sort" value={inputs.sort} onChange={handleChange}>
                            <option value="recent" name="recent">recent</option>
                            <option value="distance" name="distance">distance</option>
                    </select>
                </div> */}
                <div className="input-wrapper">
                    <button type="button" onClick={reset}>clear</button>
                    <button type="submit">search</button>
                </div>
            </form>}
            <span></span>
        </>
    )
}

export default Form
