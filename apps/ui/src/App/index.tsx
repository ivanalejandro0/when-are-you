import React from 'react';

import moment from 'moment-timezone';
window.moment = moment;

import { useLocalClock } from '../use-clock';
import { PersonList } from '../PersonList';

import styles from './index.module.css';

function App(): React.ReactElement {
  const clock = useLocalClock();
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <p className={styles.clock}>
          <span className={styles.timeOffset}>Local time:</span> {clock}
        </p>
      </header>
      <main className={styles.body}>
        <PersonList />
      </main>
    </div>
  );
}

export default App;
