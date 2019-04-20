import { ParameterizedContext } from 'koa';

import StreamServerSentEvent from '@/utils/stream_sse';

/* #region  koa context state */
export type CustomKoaContext = ParameterizedContext<IContextState>;

export interface IContextState {
  id: string;
  sse?: StreamServerSentEvent;
}
/* #endregion */
