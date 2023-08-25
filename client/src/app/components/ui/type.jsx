import React from 'react';
import PropTypes from 'prop-types';
import { useType } from '../../hooks/useType';

const Type = ({ type }) => {
  const { getType, isLoading } = useType()
  if (isLoading) return 'Loading type furniture'
  const typeList = getType(type)
  return (
    <>
      {!isLoading && <span>{typeList.type}</span>}
    </>
  );
}
Type.propTypes = {
  type: PropTypes.object.isRequired
}
export default Type;
