import React, { useContext, useEffect, useState } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function Table() {
  const headerTable = [
    'Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL',
  ];
  const optionsColumn = [
    'population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water',
  ];
  const { data } = useContext(starWarsContext);
  const [filters, setFilters] = useState(optionsColumn);
  const [screenFilters, setScreenFilters] = useState([]);
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
  const filterResult = () => {
    switch (inputs.quantity) {
    case 'maior que':
      setSearch(search.filter((el) => Number(el[inputs.columnFilter])
      > Number(inputs.number)));
      break;
    case 'menor que':
      setSearch(search.filter((el) => Number(el[inputs.columnFilter])
      < Number(inputs.number)));
      break;
    case 'igual a':
      setSearch(search.filter((el) => Number(el[inputs.columnFilter])
      === Number(inputs.number)));
      break;
    default:
      console.log(inputs.quantity);
      break;
    }
  };
  useEffect(() => {
    if (inputs.name.length > 0) {
      setSearch(dataFilterName);
    } else {
      setSearch(data);
    }
  }, [inputs.name, data]);
  useEffect(() => {
    setInputs({ ...inputs, columnFilter: filters[0] });
  }, [filters]);
  const btnFilter = () => {
    const newFilter = filters.filter((el) => el !== inputs.columnFilter);
    setScreenFilters([...screenFilters,
      `${inputs.columnFilter} ${inputs.quantity} ${inputs.number}`]);
    filterResult();
    setFilters(newFilter);
  };
  const btnRemoveAllFilter = () => {
    setScreenFilters([]);
    setFilters(optionsColumn);
    setSearch(data);
  };
  const [search2, setSearch2] = useState('');
  // Requisito 7 foi feito com ajuda de Eduardo Luiz
  const oldFilters = () => {
    screenFilters.forEach((el) => {
      const splitScreen = el.split(' ');
      switch (splitScreen[1]) {
      case 'maior':
        setSearch(search2.filter((e) => Number(e[splitScreen[0]])
        > Number(splitScreen[3])));
        break;
      case 'menor':
        setSearch(search2.filter((e) => Number(e[splitScreen[0]])
        < Number(splitScreen[3])));
        break;
      case 'igual':
        setSearch(search2.filter((e) => Number(e[splitScreen[0]])
        === Number(splitScreen[3])));
        break;
      default:
        console.log(splitScreen);
        break;
      }
    });
  };
  const [deleted, setDeleted] = useState('');
  const btnRemoveOneFilter = (event) => {
    setScreenFilters((a) => a.filter((el) => el !== event.target.value));
    const valueColunm = optionsColumn.filter((el) => event.target
      .value.includes(el));
    console.log(valueColunm);
    setFilters([...filters, ...valueColunm]);
    setSearch(data);
    setSearch2(data);
    setDeleted('ok');
  };
  useEffect(() => {
    oldFilters();
    setDeleted('');
  }, [deleted]);
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
        {
          filters.map((el, i) => (
            <option key={ i } value={ el }>
              { el }
            </option>
          ))
        }
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
        <label htmlFor="RADIO-1">
          ASC
          <input
            id="RADIO-1"
            type="radio"
            value="ASC"
          />
        </label>
        <label htmlFor="RADIO-2">
          DESC
          <input
            id="RADIO-2"
            type="radio"
            value="DESC"
          />
        </label>
        <button
          data-testid="button-filter"
          type="submit"
          disabled={ filters[0] === undefined }
          onClick={ btnFilter }
        >
          Filtrar
        </button>
      </label>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ btnRemoveAllFilter }
      >
        Remover todas filtragens
      </button>
      <div>
        {
          filters !== undefined
          && screenFilters.map((el, i) => (
            <div
              data-testid="filter"
              key={ i }
              id={ i }
              value={ el }
            >
              { el }
              <button
                type="button"
                value={ el }
                onClick={ btnRemoveOneFilter }
              >
                X
              </button>
            </div>
          ))
        }
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
