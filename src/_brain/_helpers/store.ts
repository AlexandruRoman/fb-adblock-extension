export interface IAliasIndex {
  [key: string]: (action: any) => any;
}

interface ISender {}

export interface IProxyAction<IPayload> {
  type: string;
  payload: IPayload;
  _sender: ISender;
}

export const createAlias = <IPayload>(actionCreator: (data: IPayload) => any) => (action: IProxyAction<IPayload>) =>
  actionCreator(action.payload);
