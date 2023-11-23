import { createApi } from '@reduxjs/toolkit/query/react';

import { CreateReleaseAction } from '../../../shared/contracts/release-actions';
import { pluginId } from '../pluginId';

import { axiosBaseQuery } from './axios';

import type { CreateRelease, GetReleases } from '../../../shared/contracts/releases';

export interface GetReleasesQuery extends Pick<GetReleases.Request, 'query'> {
  filters?: {
    $and?: Array<{
      releasedAt?: {
        $null?: boolean;
      };
    }>;
  };
}

const releaseApi = createApi({
  reducerPath: pluginId,
  baseQuery: axiosBaseQuery,
  tagTypes: ['Releases'],
  endpoints: (build) => {
    return {
      getReleases: build.query<GetReleases.Response, GetReleasesQuery>({
        query(params) {
          return {
            url: '/content-releases',
            method: 'GET',
            config: { params },
          };
        },
        providesTags: ['Releases'],
      }),
      createRelease: build.mutation<CreateRelease.Response, CreateRelease.Request['body']>({
        query(data) {
          return {
            url: '/content-releases',
            method: 'POST',
            data,
          };
        },
        invalidatesTags: ['Releases'],
      }),
      createReleaseAction: build.mutation<
        CreateReleaseAction.Response,
        CreateReleaseAction.Request
      >({
        query({ body, params }) {
          return {
            url: `/content-releases/${params.releaseId}/actions`,
            method: 'POST',
            data: body,
          };
        },
      }),
    };
  },
});

const { useGetReleasesQuery, useCreateReleaseMutation, useCreateReleaseActionMutation } =
  releaseApi;

export {
  useGetReleasesQuery,
  useCreateReleaseMutation,
  useCreateReleaseActionMutation,
  releaseApi,
};
