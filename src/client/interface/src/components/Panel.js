import React, { useEffect, useState } from 'react';

// export const Panel = ({ currentPage, pages }) => {

//   const [page, setPage] = useState(currentPage);

//   useEffect(() => {
//     setPage(currentPage);
//   }, [currentPage]);

//   return (
//     <div className='PanelContainer'>
//       { pages[page] }
//     </div>
//   );

// };

export const Panel = ({children, title}) => {
  return (
    <div className='panel__container'>
      <div className='panel__align'>
        <div className='panel__title'>{ title }</div>
        { children }
      </div>
    </div>
  );
};