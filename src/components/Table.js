import React, { useContext, useState } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function Table() {
  const headerTable = [
    'Name', 'Rotatio Period',
    'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL',
  ];

  const { data } = useContext(starWarsContext);

  const [name, setName] = useState('');

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  const dataFilterName = data.filter((el) => el.name
    .toUpperCase().includes(name.toUpperCase()));

  return (
    <>
      <label htmlFor="1-filter">
        <input
          data-testid="name-filter"
          id="1-filter"
          name="name"
          type="text"
          value={ name }
          onChange={ handleChange }
        />
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
            dataFilterName.length === 0
              ? (
                <tr>
                  <td>
                    Nada Encontrado
                  </td>
                </tr>
              )
              : dataFilterName.map((el) => (
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
