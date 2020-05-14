import React from 'react';
import PropTypes from 'prop-types';

import FormFieldGrid from '../common/form-field-grid';
import { validationError } from '../common/helpers';
import { meta, input } from '@data-driven-forms/common/src/prop-types-templates';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormField from '../common/form-field';

const TimePicker = (props) => {
  const { input, isReadOnly, isDisabled, isRequired, helperText, validateOnMount, meta, ...rest } = useFieldApi(props);
  const invalid = validationError(meta, validateOnMount);

  return (
    <FormFieldGrid helperText={helperText}>
      <FormField
        required={isRequired}
        readOnly={isReadOnly}
        disabled={isDisabled}
        error={
          invalid && {
            content: meta.error
          }
        }
        control={(props) => <input {...props} readOnly={isReadOnly} disabled={isDisabled} />}
        {...input}
        {...rest}
        type="time"
      />
    </FormFieldGrid>
  );
};

TimePicker.propTypes = {
  input,
  meta,
  isReadOnly: PropTypes.bool,
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.node,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  validateOnMount: PropTypes.bool,
  locale: PropTypes.string,
  description: PropTypes.node
};

export default TimePicker;