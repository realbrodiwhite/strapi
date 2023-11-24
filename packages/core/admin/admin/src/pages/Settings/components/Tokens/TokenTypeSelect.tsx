import { Option, Select } from '@strapi/design-system';
import { useIntl } from 'react-intl';

interface TokenTypeSelectProps {
  name: string;
  options: Array<{
    label: {
      id: string;
      defaultMessage: string;
    };
    value: string;
  }>;
  errors: {
    type: string;
  };
  onChange: (event: any) => void;
  canEditInputs: boolean;
  values: {
    type: string;
  };
  label: {
    id: string;
    defaultMessage: string;
  };
}

export const TokenTypeSelect = ({
  name = 'type',
  errors = {},
  values,
  onChange,
  canEditInputs,
  options = [],
  label,
}: TokenTypeSelectProps) => {
  const { formatMessage } = useIntl();

  return (
    <Select
      name={name}
      label={formatMessage({
        id: label.id,
        defaultMessage: label.defaultMessage,
      })}
      value={values && values[name]}
      error={
        errors[name]
          ? formatMessage(
              errors[name]?.id ? errors[name] : { id: errors[name], defaultMessage: errors[name] }
            )
          : null
      }
      onChange={onChange}
      placeholder="Select"
      required
      disabled={!canEditInputs}
    >
      {options &&
        options.map(({ value, label }) => (
          <Option key={value} value={value}>
            {formatMessage(label)}
          </Option>
        ))}
    </Select>
  );
};
