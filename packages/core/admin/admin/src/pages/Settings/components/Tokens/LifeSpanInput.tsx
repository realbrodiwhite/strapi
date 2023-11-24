import { Option, Select, Typography } from '@strapi/design-system';
import { FormikErrors } from 'formik';
import { useIntl } from 'react-intl';

import { Get } from '../../../../../../shared/contracts/transfer/token';
import { getDateOfExpiration } from '../../pages/ApiTokens/EditView/utils/getDateOfExpiration';

interface LifeSpanInputProps {
  errors: Pick<Get.Response['data'], 'lifespan'>;
  values: FormikErrors<Pick<Get.Response['data'], 'lifespan'>>;
  onChange: (event: any) => void;
  isCreating: boolean;
  token: Get.Response['data'];
}

export const LifeSpanInput = ({
  token,
  errors,
  values,
  onChange,
  isCreating,
}: LifeSpanInputProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Select
        name="lifespan"
        label={formatMessage({
          id: 'Settings.tokens.form.duration',
          defaultMessage: 'Token duration',
        })}
        value={values.lifespan !== null ? values.lifespan : '0'}
        error={
          errors.lifespan
            ? formatMessage(
                errors.lifespan?.id
                  ? errors.lifespan
                  : { id: errors.lifespan, defaultMessage: errors.lifespan }
              )
            : null
        }
        onChange={(value) => {
          onChange({ target: { name: 'lifespan', value } });
        }}
        required
        disabled={!isCreating}
        placeholder="Select"
      >
        <Option value="604800000">
          {formatMessage({
            id: 'Settings.tokens.duration.7-days',
            defaultMessage: '7 days',
          })}
        </Option>
        <Option value="2592000000">
          {formatMessage({
            id: 'Settings.tokens.duration.30-days',
            defaultMessage: '30 days',
          })}
        </Option>
        <Option value="7776000000">
          {formatMessage({
            id: 'Settings.tokens.duration.90-days',
            defaultMessage: '90 days',
          })}
        </Option>
        <Option value="0">
          {formatMessage({
            id: 'Settings.tokens.duration.unlimited',
            defaultMessage: 'Unlimited',
          })}
        </Option>
      </Select>
      <Typography variant="pi" textColor="neutral600">
        {!isCreating &&
          `${formatMessage({
            id: 'Settings.tokens.duration.expiration-date',
            defaultMessage: 'Expiration date',
          })}: ${getDateOfExpiration(token?.createdAt, parseInt(values.lifespan, 10))}`}
      </Typography>
    </>
  );
};
