import React, { useRef } from 'react';
import moment from 'moment-timezone';

import type { Person } from '../people';

import { Editable } from '../editable';
import { SelectTZ } from '../select-timezone';
import { useClock } from '../use-clock';

import iconTrash from './trash.svg';

import styles from './index.module.css';

interface PersonItemProps {
  person: Person
  remove: (id: number) => void
  update: (p: Person) => void
}

export function PersonItem({ person, remove, update }: PersonItemProps): React.ReactElement {
  const [clock, workingHours, diff] = useClock(person.timezone);
  const nameRef = useRef<HTMLInputElement>(null);
  const timezoneRef = useRef<HTMLSelectElement>(null);

  function updateTZ(timezone: string) {
    const m = moment(new Date()).tz(timezone);
    const offset = m.utcOffset() / 60;

    const newPerson = {
      ...person,
      timezone,
      offset,
    };

    console.log(newPerson)
    update(newPerson);
  }

  function updateName(event: React.ChangeEvent<HTMLInputElement>) {
    const newPerson = {
      ...person,
      name: event.target.value,
    };
    console.log(newPerson)
    update(newPerson);
  }

  return (
    <div className={styles.person}>

      <div className={styles.personLeft}>
        <div className={styles.personActions}>
          <button onClick={() => remove(person.id)}>
            <img src={iconTrash} className={styles.iconTrash} />
          </button>
        </div>

        <div className={styles.personData}>

          <Editable
            text={person.name}
            childRef={nameRef}
          >
            <input
              ref={nameRef}
              value={person.name}
              onChange={updateName}
            />
          </Editable>

          <Editable
            text={
              <div className={styles.tz}>
                { person.timezone } (UTC {person.offset > 0? "+":""}{person.offset})
              </div>
            }
            childRef={timezoneRef}
          >
            <SelectTZ
              selectedTimezone={person.timezone}
              ref={timezoneRef}
              onChange={updateTZ}
            />
          </Editable>

        </div>
      </div>

      <div className={styles.clock}>
        <span className={ workingHours ? undefined : styles.nonWorkingHours }>{clock}</span>
        <div className={styles.timeOffset}>
          {
            (diff === 0)
              ? <div>same time</div>
              : <div>{ Math.abs(diff) } hs { (diff > 0) ? "ahead" : "behind" }</div>
          }
        </div>
      </div>
    </div>
  );
}
