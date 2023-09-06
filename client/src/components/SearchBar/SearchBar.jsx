import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName } from '../../redux/action/action';
import style from './SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [ name, setName ] = useState("")

    //Evita que el formulario se envíe al presionar Enter
    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")) //space
    }

    function handleSubmit(e){
        e.preventDefault();
        if(name !== ''){
            dispatch(getPokemonName(name))
            setName("")
        }
        //console.log(name)
    }

    return(
        <div className={style.searchBox}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                    className={style.searchTxt}
                    type="text" 
                    placeholder="Search Pokemon..."
                    value = {name}
                    onChange={(e) => handleInputChange(e)}
                />
                <button type="submit" className={style.searchBtn} style={{ outline: 'none' }}>
                    <i className="fas fa-search" ></i>
                </button>
            </form>
        </div>
    )
}