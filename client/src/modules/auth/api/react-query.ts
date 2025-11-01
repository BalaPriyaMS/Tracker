/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

import type { DefaultOptions, UseMutationOptions } from "@tanstack/react-query";

export interface CustomError {
  err: {
    errcode: string;
    errdata: string;
  };
  msg: string;
}

export const queryConfig = {
  queries: {
    // throwOnError: true,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
    gcTime: 0,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  AxiosError<CustomError>,
  Parameters<MutationFnType>[0]
>;
