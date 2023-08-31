import React,{useEffect} from 'react'
import { useState} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { postPokemon,getTypes } from '../../redux/action/action';
import './PokemonCreate.module.css'

const stringRegExp = /^[a-zA-Z]{1,20}$/;
const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
const urlRegExp = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;

const validate= (state,name)=>{
  let error = {}
  if(name ==='name'){
    if(state.name == '') error.name = 'El pokemon debe tener un nombre'
    if(state.name !== '' && !stringRegExp.test(state.name)){error.name = 'El nombre no debe contener cosas raras'}
    if(state.name.split('').map((leter)=>{if(Number(leter))error.name ='El nombre no debe contener numeros'})){}
  }
  return error
}


const Formulario = () => {

  const dispatch = useDispatch()
  const types = useSelector(state => state.types);

  const [state,setState] = useState({
    name:'',
    hp:1,
    attack:1,
    defense:1,
    speed:1,
    height:1,
    weight:1,
    img:'',
    types:[],
  });

  const [errors,setErrors] = useState({
    name:'',
    hp:'',
    attack:'',
    height:'',
    weight:'',
    defense:'',
    img:'',
    types:''
  })

  useEffect(()=>{
    dispatch(getTypes())
  },[])
 

  const handleChange=(e)=>{

     if ((e.target.name === 'name')  && (e.target.value.length>1)){
       if (!stringRegExp.test(e.target.value) ) {
        console.log(errors)
        return false
     }
    }
    if ((e.target.name === 'name')  && (e.target.value.length>13)){
      setErrors({...errors, [e.target.name]:'El nombre del Pokemon debe ser inferior a 12 caracteres'})
      return false
   }

     if ((e.target.name === 'height') || (e.target.name === 'weight')) {
       if (!numberRegExp.test(e.target.value) && e.target.value.length !== 0) {
        setErrors({...errors, [e.target.name]:'999 is max posibility'})
        console.log(errors)
        return false
      }
     }
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...state,
      [e.target.name]:e.target.value
    }, e.target.name))
  }

  function handleChangeType(e) {

    if (e.target.value === "0") return;

      if (state.types.filter(type => (type.name === e.target.value)).length===0) {

        let newType = {"name": e.target.value};
        setState({
          ...state,
          types: [...state.types, newType]
        });

        setErrors(validate({
          ...state,
          types: [...state.types, newType]
        } ,e.target.name));

        
        if (state.types.length === 2 - 1) {
          e.target.disabled = true;
        }  
      
    }
    e.target.value = "0";
  }
  
  const handlerClose =(e)=>{
    let newTypes = state.types.filter(type => type.name !== e.target.value);
          setState({
                ...state,
                types: newTypes
              });       

           if (state.types.length < 2+1) {
            document.getElementById("typesSelect").disabled = false;
          }

          setErrors(validate({
            ...state,
            types: newTypes
          }));
  }

  const onChangeRange=(e)=>{
    setState({
      ...state,
      [e.target.name]: e.target.value
    });      
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(state.img && state.name && state.height && state.weight && state.types.length > 0 && Object.keys(errors).length === 0){
      dispatch(postPokemon(state))
    }
    else{ return false}
  }
  
  return (
    <div className='div-form'>
      <form onSubmit={handleSubmit} className='form'>
        <div className='div-title'>
          <h1 className='title'>Create Pokemon</h1>
        </div>
        <div className='div-container-inputs'>
          <div className='inputsshorts'>
            <div className='name-img'>
              <div className='back'>
                <label>Name :</label>
                <input value={state.name} placeholder='Name' type="text" name='name' onChange={handleChange}/>
                <p className='errors'>{errors && errors.name}</p>
              </div>
            </div>
            <div className='name-img'>
              <div className='back'>
                <label>Img :</label>
                <input value={state.img} placeholder='Url img' type="text"  name='img' onChange={handleChange}/>
                <p className='errors'>{errors && errors.img}</p>
              </div>
            </div>
          </div>
          <div className='inputsshorts'>
            <div className='dos-inputs'>
              <div className='name-img'>
                <div className='back'>
                  <label>Height :</label>
                  <input value={state.height} placeholder='1  ⇄  999' type="text"  name='height' className='inputshort' onChange={handleChange}/>
                  <p className='errors'>{errors && errors.height}</p>
                </div>
              </div>
              <div className='name-img'>
                <div className='back'>
                  <label>Weight :</label>
                  <input value={state.weight} placeholder='1  ⇄  999' type="text"  name='weight' className='inputshort' onChange={handleChange}/>
                  <p className='errors'>{errors && errors.weight}</p>
                </div>
              </div>
            </div>
            <div className='aa'>
              <div className='tiitle'>
              <label className='blue-label'>TYPES:</label>
              </div>
              <div  className='types' >
              <div className='first-div'>
              <select defaultValue="0" id="typesSelect" name="types" onChange={handleChangeType} className='select'>
                <option value="0">Select Types</option>
                {types.map((type, index )=> (
                <option key={index} value={ type.name }>{type.name[0].toUpperCase() + type.name.slice(1)}</option>
                ))}
              </select>
            </div> 
            <div className='your-types'>
              <div className='div-types-ready'>
              {state.types.map((type, index) => (
              <div key={index} className='type-ready'>
                <span className='name-span'>{type.name[0].toUpperCase() + type.name.slice(1)}</span>
                <button value={type.name} onClick={handlerClose}>X</button>
              </div>
              ))}
            </div>  
            </div>
          </div>
          </div>
          </div>
        <div className='itemContainerRange'>
          <div className='stats'>
            <div className='rangeGroup'>
              <span className='labelRange'>HP</span>
              <input type="range"  name="hp" onChange={onChangeRange}
                min={1} max={255} value={state.hp}/>
              <span className='labelRangeNumber'>{state.hp}</span>
            </div>
            <div className='rangeGroup'>
              <span className='labelRange'>DEFENSE</span>
              <input type="range"  name="defense" onChange={onChangeRange}
                min={1} max={255} value={state.defense}/>
              <span className='labelRangeNumber'>{state.defense}</span>
            </div>
            <div className='rangeGroup'>
              <span className='labelRange'>ATTACK</span>
              <input type="range"  name="attack" onChange={onChangeRange}
                min={1} max={255} value={state.attack}/>
              <span className='labelRangeNumber'>{state.attack}</span>
            </div>
            <div className='rangeGroup'>
              <span className='labelRange'>SPEED</span>
              <input type="range"  name="speed" onChange={onChangeRange}
                min={1} max={255} value={state.speed}/>
              <span className='labelRangeNumber'>{state.speed}</span>
            </div>
          </div>
        </div>
      </div>
        <input value='Create' type='submit' />
      </form>
    </div>
  )
}

export default Formulario





/* import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes, getPokemons } from '../../redux/action/action';
import style from './PokemonCreate.module.css'
import validate from './Validate'
//import Oak from '../../images/profesor.png'
//import swal from 'sweetalert';


export default function PokemonCreate(){
    const dispatch = useDispatch();
    const types = useSelector(state => state.types)
    const pokemons = useSelector(state => state.allPokemons.map( pok => pok.name))
    const history = useNavigate()

    const [errors, setErrors] = useState({})
    const [section, setSection] = useState(1);


    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        weight: '',
        height: '',
        types: [],
    })

    const typesColors={
        fire: '#F57D31',
        normal: '#AAA67F',
        fighting: '#D3425F',
        flying: '#A891EC',
        ground: '#DEC16B',
        poison: '#A43E9E',
        rock: '#B69E31',
        bug: '#A7B723',
        ghost: '#70559B',
        steel: '#5695A3',
        water: '#6493EB',
        grass: '#74CB48',
        electric: '#F9CF30',
        psychic: '#FB5584',
        ice: '#9AD6DF',
        dragon: '#7037FF',
        dark: '#75574C',
        fairy: '#E69EAC',
        unknown: '#BF5481',
        shadow: '#36045E'
    }


    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value.replaceAll(/^\s+/g, "").replaceAll(/\s+/g, " ")
        })

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }, pokemons))
    }

    
    function handleSection(e){
        e.preventDefault();

        Object.keys(errors).length === 1 && errors.types.length ?
            setSection(section === 1 ? 2 : 1) 
            :
            <h1>("You must complete the form correctly!", "", "error")</h1>;
    }

    function handleChecked(e){
        if (e.target.checked) {
            setInput({
            ...input,
            types: [...input.types , e.target.value]
            })

            setErrors(validate({
                ...input,
                types: [...input.types , e.target.value]
            }, pokemons))
            
        } else if (!e.target.checked) {
            setInput({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
                })

            setErrors(validate({
                ...input,
                types: input.types.filter(el => el !== e.target.value)
            }, pokemons))    
        }
    };

    function handleSubmit(e){
        e.preventDefault();

        if(Object.keys(errors).length === 0 && input.name.length){
            dispatch(postPokemon(input));
            dispatch(getPokemons());
            <h1>("Good job!", "Pokemon created successfuly!", "success")</h1>;
            setInput({
                name: '',
                hp: '',
                attack: '',
                defense: '',
                speed: '',
                weight: '',
                height: '',
                types: [],
            })
            history("/home")
        } else{
            <h1>("You must choose at least one type!", "", "error")</h1>;
        }  
    }


    return(
        <div className={style.pagina}>
            <img src= 'https://img.freepik.com/vector-gratis/fondo-acuarela-rosa-pintado-mano-detallado_1048-17039.jpg?w=2000' alt="Profesor Oak" height="560px" className={style.img}/>
            <Link to='/home' className={style.back} style={{textDecoration: 'none'}}><button>Return home</button></Link>
            <div className={style.container}>
                <div className={style.header}>
                    <h2>Create your pokemon!</h2>
                </div>
                <form onSubmit={ (e) => handleSubmit(e) }>
                    <section className={section === 1 ? style.show : style.hide}>
                    <div className={style.formdiv} >
                        <label>Name</label>
                        <input 
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={ (e) => handleChange(e) }
                            style={input.name.length ? errors.name ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                            autocomplete="off"
                        />
                        {
                            errors.name ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.name}</p>
                                </div>
                            ) :
                            input.name.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Hp</label>
                        <input 
                            type="number"
                            value={input.hp}
                            name="hp"
                            onChange={ (e) => handleChange(e) }
                            style={input.hp.length ? errors.hp ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.hp ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.hp}</p>
                                </div>
                            ) :
                            input.hp.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Attack</label>
                        <input 
                            type="number"
                            value={input.attack}
                            name="attack"
                            onChange={ (e) => handleChange(e) }
                            style={input.attack.length ? errors.attack ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.attack ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.attack}</p>
                                </div>
                            ) :
                            input.attack.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Defense</label>
                        <input 
                            type="number"
                            value={input.defense}
                            name="defense"
                            onChange={ (e) => handleChange(e) }
                            style={input.defense.length ? errors.defense ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                             errors.defense ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.defense}</p>
                                </div>
                            ) :
                            input.defense.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Speed</label>
                        <input 
                            type="number"
                            value={input.speed}
                            name="speed"
                            onChange={ (e) => handleChange(e) }
                            style={input.speed.length ? errors.speed ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                             errors.speed ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.speed}</p>
                                </div>
                            ) :
                            input.speed.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Weight</label>
                        <input 
                            type="number"
                            value={input.weight}
                            name="weight"
                            onChange={ (e) => handleChange(e) }
                            style={input.weight.length ? errors.weight ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                             errors.weight ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.weight}</p>
                                </div>
                            ) :
                            input.weight.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }
                    </div>
                    <div className={style.formdiv}>
                        <label>Height</label>
                        <input 
                            type="number"
                            value={input.height}
                            name="height"
                            onChange={ (e) => handleChange(e) }
                            style={input.height.length ? errors.height ? {borderColor: '#e74c3c' } : {borderColor: '#2ecc71'} : {}}
                        />
                        {
                            errors.height ? (
                                <div>
                                <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                <p>{errors.height}</p>
                                </div>
                            ) :
                            input.height.length ?
                            <i className="fas fa-check-circle" style={{color: '#2ecc71'}}></i>
                            :
                            <i></i>
                        }

                    </div>
                    <button onClick={(e) => {handleSection(e)}}>Next</button>
                    </section>
                    <section className={section === 2 ? style.show : style.hide}>
                        <div style={{position:'relative'}}> 
                            <span className={style.choosetypes} style={{display:'flex', justifyContent:'flex-start', fontFamily:'Open Sans'}}>Choose up to 2 Pokemon types</span>

                            <div className={style.containertypes}>
                            {
                                types.map( type => (
                                    <label for={type.name}>
                                        <div className={style.bytype} > 
                                            <input 
                                                    type="checkbox" 
                                                    id={type.name} 
                                                    value={type.name}
                                                    onChange={(e) => handleChecked(e)}
                                            />
                                            <div className={style.circle} style={{display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:typesColors[type.name]}}
                                            ><img src={`images/icons/${type.name}.svg`} alt={`${type.name}`} height="16px" /></div>
                                            <div style={{width:'8px'}}></div>       
                                            {type.name}
                                        </div>
                                    </label>
                                ))
                            }  
                            </div>  
                            
                                {
                                    errors.types ? (
                                        <div className={style.typeserror}>
                                            <i className="fas fa-exclamation-circle" style={{color: '#e74c3c'}}></i>
                                            <span>{errors.types}</span>
                                        </div>
                                    ) :
                                    <i></i>
                                }
                        </div>  

                        <div style={{display:'flex', flexFlow:'row nowrap'}}> 
                            <button className={style.previous} onClick={(e) => {handleSection(e)}}>Previous</button>
                            <button className={style.create} type='submit'>Create</button>
                        </div>
                        
                    </section>   
                    

                </form>
            </div>

        </div>
    )
} */