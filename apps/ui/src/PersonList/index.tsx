import React from 'react';

import { PersonItem } from '../PersonItem';
import { usePeople } from '../people';

import iconPlus from './plus.svg';

import styles from './index.module.css';

export function PersonList(): React.ReactElement {
  const [people, removePerson, updatePerson, addPerson] = usePeople();

  function addNewPerson() {
    addPerson({
      name: "Name",
      timezone: "UTC",
      offset: 0,
    })
  }

  return (
    <div className={styles.list}>
      { people.map(person => (
        <PersonItem
          key={person.id}
          person={person}
          remove={removePerson}
          update={updatePerson}
        />
      )) }
      <button
        className={styles.buttonIcon}
        onClick={addNewPerson}
      >
        <img src={iconPlus} className={styles.iconPlus} />
      </button>
    </div>
  )
}
