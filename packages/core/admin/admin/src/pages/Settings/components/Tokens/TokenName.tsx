import { TextInput } from '@strapi/design-system';
import { FormikErrors } from 'formik';
import { useIntl } from 'react-intl';

import { Get } from '../../../../../../shared/contracts/transfer/token';

interface TokenNameProps {
  errors: FormikErrors<Pick<Get.Response['data'], 'name'>>;
  values: Pick<Get.Response['data'], 'name'>;
  onChange: (event: any) => void;
  canEditInputs: boolean;
}

export const TokenName = ({ errors, values, onChange, canEditInputs }: TokenNameProps) => {
  const { formatMessage } = useIntl();

  return (
    <TextInput
      name="name"
      error={
        errors.name
          ? formatMessage(
              errors.name?.id ? errors.name : { id: errors.name, defaultMessage: errors.name }
            )
          : null
      }
      label={formatMessage({
        id: 'Settings.tokens.form.name',
        defaultMessage: 'Name',
      })}
      onChange={onChange}
      value={values.name}
      disabled={!canEditInputs}
      required
    />
  );
};
