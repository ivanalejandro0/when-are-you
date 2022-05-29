import { useState, useEffect } from 'react';
import localforage from 'localforage';

const store = localforage.createInstance({
  name: "when-are-you",
  storeName: "people",
});

async function getStorePeople(): Promise<Person[]> {
  const keys = await store.keys();
  const people: Person[] = [];

  for (const k of keys) {
    const person = await store.getItem(k) as Person;
    people.push(person);
  }

  return people;
}

async function setStorePeople(people: Person[]) {
  await store.clear();
  for (const person of people) {
    await store.setItem(String(person.id), person);
  }
}


// dev/debug tool {
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _store: any;
  }
}

window._store = {
  set: setStorePeople,
  get: getStorePeople,
}
// }

export interface Person {
  id: number,
  name: string
  timezone: string
  offset: number
}

type PersonWithNoId = Omit<Person, 'id'>;

export function usePeople(): [Person[], (id: number) => void, (p: Person) => void, (p: PersonWithNoId) => void] {
  const [people, setPeople] = useState<Person[]>([]);

  useEffect(function loadPeople() {
    getStorePeople().then(p => {
      setPeople(p);
    });
  }, [setPeople]);

  function removePerson(id: number): void {
    const person = people.findIndex(person => person.id === id);
    const newPeople = [...people];
    newPeople.splice(person, 1);
    setPeople(newPeople);
    setStorePeople(newPeople);
  }

  function updatePerson(p: Person): void {
    const person = people.findIndex(person => person.id === p.id);
    const newPeople = [...people];
    newPeople.splice(person, 1, p);
    setPeople(newPeople);
    setStorePeople(newPeople);
  }

  function addPerson(p: PersonWithNoId): void {
    let newId = 0;
    if (people.length !== 0) {
      newId = people[people.length - 1].id + 1;
    }
    const person: Person = {
      id: newId,
      ...p,
    }
    const newPeople = [...people, person];
    setPeople(newPeople);
    setStorePeople(newPeople);
  }

  return [people, removePerson, updatePerson, addPerson];
}
