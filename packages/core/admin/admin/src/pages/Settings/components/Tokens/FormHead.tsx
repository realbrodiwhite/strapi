import * as React from 'react';

import { Button, Flex, HeaderLayout } from '@strapi/design-system';
import { ConfirmDialog, Link } from '@strapi/helper-plugin';
import { ArrowLeft, Check, Refresh } from '@strapi/icons';
import { Entity } from '@strapi/types';
import { useIntl } from 'react-intl';

import { Get, Create } from '../../../../../../shared/contracts/transfer/token';
import { useRegenerate } from '../../hooks/useRegenerate';

interface RegenerateProps {
  onRegenerate?: (newKey: string) => void;
  idToRegenerate: Entity.ID;
  backUrl: string;
  onError?: () => void;
}

const Regenerate = ({
  onRegenerate = () => {},
  idToRegenerate,
  backUrl,
  onError,
}: RegenerateProps) => {
  const { formatMessage } = useIntl();
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const { regenerateData, isLoadingConfirmation } = useRegenerate(
    backUrl,
    idToRegenerate,
    onRegenerate,
    onError
  );
  const handleConfirmRegeneration = async () => {
    regenerateData();
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Button
        startIcon={<Refresh />}
        type="button"
        size="S"
        variant="tertiary"
        onClick={() => setShowConfirmDialog(true)}
        name="regenerate"
      >
        {formatMessage({
          id: 'Settings.tokens.regenerate',
          defaultMessage: 'Regenerate',
        })}
      </Button>

      <ConfirmDialog
        bodyText={{
          id: 'Settings.tokens.popUpWarning.message',
          defaultMessage: 'Are you sure you want to regenerate this token?',
        }}
        iconRightButton={<Refresh />}
        isConfirmButtonLoading={isLoadingConfirmation}
        isOpen={showConfirmDialog}
        onToggleDialog={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmRegeneration}
        leftButtonText={{
          id: 'Settings.tokens.Button.cancel',
          defaultMessage: 'Cancel',
        }}
        rightButtonText={{
          id: 'Settings.tokens.Button.regenerate',
          defaultMessage: 'Regenerate',
        }}
        title={{
          id: 'Settings.tokens.RegenerateDialog.title',
          defaultMessage: 'Regenerate token',
        }}
      />
    </>
  );
};

interface FormHeadProps {
  title: {
    id: string;
    defaultMessage: string;
  };
  token: Get.Response['data'];
  canEditInputs: boolean;
  canRegenerate: boolean;
  setToken: (token: Get.Response['data'] & Create.Response['data']['accessKey']) => void;
  isSubmitting: boolean;
  backUrl: string;
  regenerateUrl: string;
  onErrorRegenerate?: () => void;
}

export const FormHead = ({
  title,
  token,
  setToken,
  canEditInputs,
  canRegenerate,
  isSubmitting,
  backUrl,
  regenerateUrl,
  onErrorRegenerate,
}: FormHeadProps) => {
  const { formatMessage } = useIntl();
  const handleRegenerate = (newKey: string) => {
    setToken({
      ...token,
      accessKey: newKey,
    });
  };

  return (
    <HeaderLayout
      title={token?.name || formatMessage(title)}
      primaryAction={
        canEditInputs ? (
          <Flex gap={2}>
            {canRegenerate && token?.id && (
              <Regenerate
                backUrl={regenerateUrl}
                onRegenerate={handleRegenerate}
                idToRegenerate={token?.id}
                onError={onErrorRegenerate}
              />
            )}
            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              startIcon={<Check />}
              type="submit"
              size="S"
            >
              {formatMessage({
                id: 'global.save',
                defaultMessage: 'Save',
              })}
            </Button>
          </Flex>
        ) : (
          canRegenerate &&
          token?.id && (
            <Regenerate
              onRegenerate={handleRegenerate}
              idToRegenerate={token?.id}
              backUrl={regenerateUrl}
            />
          )
        )
      }
      navigationAction={
        <>
          {/* @ts-expect-error polymorphic */}
          <Link startIcon={<ArrowLeft />} to={backUrl}>
            {formatMessage({
              id: 'global.back',
              defaultMessage: 'Back',
            })}
          </Link>
        </>
      }
      ellipsis
    />
  );
};
