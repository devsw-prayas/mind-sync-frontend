import { useEffect, useRef, useState } from 'react';

// useApi(() => api.clinic.patients(), [deps]) -> { data, loading, error, reload }
export function useApi(fn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const run = () => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    Promise.resolve()
      .then(() => fnRef.current())
      .then((data) => { if (alive) setState({ data, loading: false, error: null }); })
      .catch((error) => { if (alive) setState({ data: null, loading: false, error }); });
    return () => { alive = false; };
  };

  useEffect(run, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { ...state, reload: run };
}
