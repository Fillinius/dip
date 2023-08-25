import React from 'react';
import PropTypes from 'prop-types';
import Quality from './quality';
import { useSelector } from 'react-redux';
import { getQualities, getQualitiesLoading } from '../../../store/qualities';

const QualitiesList = ({ qualities }) => {
  const quality = useSelector(getQualities())
  const isLoading = useSelector(getQualitiesLoading())
  if (isLoading) return 'Loading quality...'
  // блок получения качества по ID
  const getQualityById = (element) => {
    const qualityArraw = []
    if (!isLoading) {
      for (const elem of element) {
        for (const qual of quality) {
          if (elem === qual._id) {
            qualityArraw.push(qual)
          }
        }
      }
    }
    return qualityArraw
  }
  const qualityList = getQualityById(qualities)
  return (
    <>
      {qualityList.map((qual) => (
        <Quality key={qual._id} {...qual} />
      )
      )}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array
};

export default QualitiesList;
