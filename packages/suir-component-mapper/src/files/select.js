import React from 'react';
import PropTypes from 'prop-types';

import CommonSelect from '@data-driven-forms/common/src/select';
import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { Dropdown } from 'semantic-ui-react';
import FormField from '../common/form-field';

const SuirSelect = ({
  onChange,
  value,
  meta,
  helperText,
  validateOnMount,
  isReadOnly,
  isDisabled,
  isClearable,
  isSearchable,
  options,
  label,
  isMulti,
  isRequired,
  classNamePrefix,
  onInputChange,
  isFetching,
  noOptionsMessage,
  hideSelectedOptions,
  closeMenuOnSelect,
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  let internalValue = value;
  if (isMulti && Array.isArray(internalValue)) {
    internalValue = value.map((item) => (typeof item === 'object' ? item.value : item));
  }

  if (!isMulti && Array.isArray(internalValue) && internalValue[0]) {
    internalValue = typeof internalValue[0] === 'object' ? internalValue[0].value : internalValue[0];
  }

  if (!isMulti && Array.isArray(internalValue) && !internalValue[0]) {
    internalValue = undefined;
  }

  return (
    <FormFieldGrid helperText={helperText}>
      <FormField
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        clearable={isClearable}
        search={isSearchable}
        loading={isFetching}
        noResultsMessage={isFetching ? 'Loading' : noOptionsMessage()}
        onSearchChange={({ target: { value } }) => onInputChange(value)}
        options={options.map(({ label, value, ...rest }) => ({
          key: value,
          text: label,
          value,
          ...rest
        }))}
        onChange={(_event, { value }) => {
          if (isMulti) {
            return onChange(Array.isArray(value) && value.map((value) => ({ value })));
          }

          return onChange(value && { value });
        }}
        selection
        fluid
        multiple={isMulti}
        label={label}
        error={invalid && { content: meta.error }}
        control={Dropdown}
        value={internalValue}
        {...rest}
      />
    </FormFieldGrid>
  );
};

SuirSelect.propTypes = {
  input,
  meta,
  placeholder: PropTypes.node,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  isSearchable: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.any.isRequired, label: PropTypes.node.isRequired })),
  description: PropTypes.node,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  noOptionsMessage: PropTypes.func,
  isRequired: PropTypes.bool,
  classNamePrefix: PropTypes.string,
  onInputChange: PropTypes.func,
  isFetching: PropTypes.bool,
  hideSelectedOptions: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool
};

SuirSelect.defaultProps = {
  placeholder: 'Please choose',
  noOptionsMessage: 'No option found',
  options: []
};

const Select = (props) => {
  const { input, ...formProps } = useFieldApi(props);
  return <CommonSelect simpleValue {...input} {...formProps} SelectComponent={SuirSelect} />;
};

export default Select;

export const InternalSelect = SuirSelect;