import StreamServerSentEvent from '@/utils/stream_sse';

/* #region  koa context state */
export interface IContextState {
  id: string;
  sse?: StreamServerSentEvent;
}
/* #endregion */
