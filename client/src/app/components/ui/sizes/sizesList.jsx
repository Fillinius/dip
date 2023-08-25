import React from 'react';
import PropTypes from 'prop-types';
import Size from './sizes';
import { useSize } from '../../../hooks/useSize';

const SizesList = ({ sizes: sizeId }) => {
  const { sizes, isLoading } = useSize()
  // const getSizeById = (element) => {
  //   const sizeArray = []
  //   for (const elem of element) {
  //     for (const z of sizes) {
  //       if (elem === z._id) {
  //         sizeArray.push(z)
  //       }
  //     }
  //   }
  //   return sizeArray
  // }
  // const sizeslist = getSizeById(sizeId);
  return (
    <div>
      {!isLoading && sizes.map((s) => (
        <span key={s._id}> <Size {...s} /> </span>
      ))}
    </div>)
}

SizesList.propTypes = {
  sizes: PropTypes.array
}

export default SizesList;
