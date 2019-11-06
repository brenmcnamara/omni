import { useEffect, useState } from 'react';

export interface Group {
  id: string;
  name: string;
  parentGroup: Group | null;
}

export interface State {
  groups: { [id: string]: Group };
}

export type Setter = (state: State) => void;

let activeState: State = { groups: {} };

const setterSlaves: Setter[] = [];

function setterMaster(state: State) {
  activeState = state;
  for (const setter of setterSlaves) {
    setter(state);
  }
}

export default function useFileGroups(): [State, Setter] {
  const [state, setState] = useState(activeState);

  useEffect(() => {
    setterSlaves.push(setState);

    return () => {
      const index = setterSlaves.indexOf(setState);
      if (index >= 0) {
        setterSlaves.splice(index, 1);
      }
    };
  }, []);

  return [state, setterMaster];
}
