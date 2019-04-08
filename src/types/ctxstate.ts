import StreamServerSentEvent from '@/utils/stream_sse';

export interface IContextState {
  id: string;
  sse?: StreamServerSentEvent;
}
