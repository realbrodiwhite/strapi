import { Textarea } from '@strapi/design-system';
import { FormikErrors } from 'formik';
import { useIntl } from 'react-intl';

import { Get } from '../../../../../../shared/contracts/transfer/token';

interface TokenDescriptionProps {
  errors: FormikErrors<Pick<Get.Response['data'], 'description'>>;
  values: Pick<Get.Response['data'], 'description'>;
  onChange: (event: any) => void;
  canEditInputs: boolean;
}

export const TokenDescription = ({
  errors,
  values,
  onChange,
  canEditInputs,
}: TokenDescriptionProps) => {
  const { formatMessage } = useIntl();

  return (
    <Textarea
      label={formatMessage({
        id: 'Settings.tokens.form.description',
        defaultMessage: 'Description',
      })}
      id="description"
      error={
        errors.description
          ? formatMessage(
              errors.description?.id
                ? errors.description
                : {
                    id: errors.description,
                    defaultMessage: errors.description,
                  }
            )
          : null
      }
      onChange={onChange}
      disabled={!canEditInputs}
    >
      {values.description}
    </Textarea>
  );
};
