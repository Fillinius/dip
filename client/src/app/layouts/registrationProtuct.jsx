import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { validator } from '../utils/validator';
import { useHistory } from 'react-router-dom';
import { registrationFurniturs } from '../store/furniturs';
import TextField from '../components/common/form/textField';
import SelectField from '../components/common/form/selectField';
import { useType } from '../hooks/useType';
import MultiSelectField from '../components/common/form/multiSelectField';
import { getQualities } from '../store/qualities';
import { useSize } from '../hooks/useSize';

const RegistrationProduct = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    vendor_code: '',
    name: '',
    type: '',
    sizes: [],
    qualities: []
  })

  const [errors, setErrors] = useState({})
  const history = useHistory()
  const { types, isloading: isLoadingType } = useType()
  const { sizes, isLoading: isLoadingSize } = useSize()
  const qualities = useSelector(getQualities())

  const qualitiesList = qualities.map(q => ({
    label: q.name,
    value: q._id
  }))

  const typesList = types.map(t => ({
    label: t.type,
    value: t._id
  }))

  const sizesList = sizes.map(z => ({
    label: z.size,
    value: z._id
  }))

  const handleChange = ({ target }) => {
    setData((prevstate) => ({
      ...prevstate,
      [target.name]: target.value
    }))
  }
  const handleChangeMulti = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }
  const validatorConfig = {
    vendor_code: {
      isRequared: {
        message: 'Поле обязательно для заполнения'
      }
    },
    name: {
      isRequared: {
        message: 'Поле обязательно для заполнения'
      },
      minWord: {
        message: 'Наименование товара должно быть минимум из 3 символов',
        value: 3
      }
    },
    type: {
      isRequared: {
        message: 'Поле обязательно для заполнения'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  const isValid = Object.keys(errors).length === 0
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const changeData = { ...data, qualities: data.qualities.map((q) => q.value), sizes: data.sizes.map((z) => z.value) }
    console.log(changeData);
    dispatch(registrationFurniturs(changeData))
    history.push('furniturs/')
  }

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 shadow '>
          {!isLoadingType && !isLoadingSize && <form onSubmit={handleSubmit}>
            <TextField
              label="Артикул"
              type="text"
              name="vendor_code"
              value={data.vendor_code}
              onChange={handleChange}
              error={errors.vendor_code} />
            <TextField
              label="Наименование  товара"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name} />
            <SelectField
              label='Тип товара'
              name='type'
              value={data.type}
              onChange={handleChange}
              options={typesList}
              error={errors.type}
              defaultOption='Выберите тип товара' />
            <MultiSelectField
              name="qualities"
              options={qualitiesList}
              defaultValue={data.qualities}
              onChange={handleChangeMulti}
              label="Выберите цвет товара" />
            <MultiSelectField
              name="sizes"
              options={sizesList}
              defaultValue={data.sizes}
              onChange={handleChangeMulti}
              label="Выберите размер товара" />
            <button
              type='submit'
              disabled={!isValid}
              className='btn btn-primary'
            >Submit</button>
          </form>}
        </div>
      </div>
    </div>
  );
}

export default RegistrationProduct;
