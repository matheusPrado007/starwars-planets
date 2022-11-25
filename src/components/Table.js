import React, { useContext, useEffect, useState } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function Table() {
  const headerTable = [
    'Name', 'Rotation Period',
    'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL',
  ];

  const { data } = useContext(starWarsContext);

  const [search, setSearch] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    columnFilter: 'population',
    quantity: 'maior que',
    number: 0,
  });

  const dataFilterName = data.filter((el) => el.name
    .toUpperCase().includes(inputs.name.toUpperCase()));

  const handleChange = ({ target }) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  useEffect(() => {
    if (inputs.name.length > 0) {
      setSearch(dataFilterName);
    } else {
      setSearch(data);
    }
  }, [inputs.name, data]);

  const filterResult = (arr) => {
    console.log(inputs);
    switch (inputs.quantity) {
    case 'maior que':
      setSearch(arr.filter((el) => Number(el[inputs.columnFilter])
      > Number(inputs.number)));
      break;
    case 'menor que':
      setSearch(arr.filter((el) => Number(el[inputs.columnFilter])
      < Number(inputs.number)));
      break;
    case 'igual a':
      setSearch(arr.filter((el) => Number(el[inputs.columnFilter])
      === Number(inputs.number)));
      break;
    default:
      setSearch(arr);
      break;
    }
    return [];
  };

  return (
    <>
      <label htmlFor="1-filter">
        <input
          data-testid="name-filter"
          id="1-filter"
          name="name"
          type="text"
          value={ inputs.name }
          placeholder="name"
          onChange={ handleChange }
        />
      </label>
      <select
        data-testid="column-filter"
        name="columnFilter"
        onChange={ handleChange }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="quantity"
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <label htmlFor="2-filter">
        <input
          data-testid="value-filter"
          id="1-filter"
          name="number"
          type="number"
          placeholder="number"
          value={ inputs.number }
          onChange={ handleChange }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => filterResult(search) }
        >
          Filtrar
        </button>
      </label>
      <table>
        <thead>
          <tr>
            { headerTable.map((el) => (
              <th key={ el }>{el}</th>
            )) }
          </tr>
        </thead>
        <tbody>
          {
            search.length === 0
              ? (
                <tr>
                  <td>
                    Nada Encontrado
                  </td>
                </tr>
              )
              : search.map((el) => (
                <tr key={ el.name }>
                  <td>{ el.name }</td>
                  <td>{ el.rotation_period }</td>
                  <td>{ el.orbital_period }</td>
                  <td>{ el.diameter }</td>
                  <td>{ el.climate }</td>
                  <td>{ el.gravity }</td>
                  <td>{ el.terrain }</td>
                  <td>{ el.surface_water }</td>
                  <td>{ el.population }</td>
                  <td>{ el.films }</td>
                  <td>{ el.created }</td>
                  <td>{ el.edited }</td>
                  <td>{ el.url }</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </>
  );
}
