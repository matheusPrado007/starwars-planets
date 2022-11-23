import React, { useContext } from 'react';
import starWarsContext from '../context/StarWarsContext';

export default function Table() {
  const { data } = useContext(starWarsContext);
  console.log(data);
  const headerTable = [
    'Name', 'Rotatio Period',
    'Orbital Period', 'Diameter', 'Climate', 'Gravity',
    'Terrain', 'Surface Water', 'Population', 'Films',
    'Created', 'Edited', 'URL',
  ];
  return (
    <table>
      <thead>
        <tr>
          { headerTable.map((el) => (
            <th key={ el }>{el}</th>
          )) }
        </tr>
      </thead>
      <tbody>
        { data.map((el) => (
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
        ))}
      </tbody>
    </table>
  );
}
