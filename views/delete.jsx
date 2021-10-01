import React from 'react';
import Nav from './components/Nav'
import DefaultLayout from './layouts/default'


const Delete = ({img, name, alt, breed, description}) => {
    return (
        <DefaultLayout title="Seleter a Cat">
            <Nav/>
            <form action="#" class="cat-form">
                <h2>Shelter the cat</h2>
                <img src="https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730_1280.jpg" alt=""/>
                <label for="name">Name</label>
                <input type="text" id="name" value="Pretty Kitty" disabled/>
                <label for="description">Description</label>
                <textarea id="description" disabled>Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.</textarea>
                <label for="group">Breed</label>
                <select id="group" disabled>
                    <option value="Fluffy Cat">Fluffy Cat</option>
                </select>
                <button>SHELTER THE CAT</button>
            </form>
        </DefaultLayout>
    )
}

module.exports = Delete;