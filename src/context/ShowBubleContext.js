import React, { createContext, useState } from 'react';
export const ShowBubleContext = createContext();

export default props => {
  const [state, setState] = useState({ showId: '' });

  const updateShowBuble = e => setState({ ...state, showId: e?.target?.id || '' });

  return <ShowBubleContext.Provider value={{ ...state, updateShowBuble }}>{props.children}</ShowBubleContext.Provider>;
};
