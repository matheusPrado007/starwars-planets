import React, { useContext, useEffect, useState } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function Table() {
  const headerTable = [
    'Name', 'Rotation Period',
    'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL',
  ];

  const optionsColumn = [
    'population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water',
  ];

  const { data } = useContext(starWarsContext);

  const [search, setSearch] = useState('');
  const [inputs, setInputs] = useState({
    name: '',
    columnFilter: optionsColumn[0],
    quantity: 'maior que',
    number: 0,
  });

  const [colunmFilter, setColunmFilter] = useState(optionsColumn);

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

  const btnFilter = () => {
    filterResult(search);
    const newFilter = colunmFilter.filter((el) => (
      el !== inputs.columnFilter
    ));
    setColunmFilter(newFilter);
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
        { colunmFilter.map((el, i) => (
          <option key={ i } value={ el } id={ el }>
            { el }
          </option>
        )) }
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
          onClick={ btnFilter }
        >
          Filtrar
        </button>
      </label>
      <div>
        <p>
          {`${inputs.columnFilter} ${inputs.quantity} ${inputs.number}`}
          <button type="button">
            Excluir
          </button>
        </p>
      </div>
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
