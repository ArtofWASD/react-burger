export const  API_URL = 'https://norma.nomoreparties.space/api'
export const WS_URL = "wss://norma.nomoreparties.space";

export interface ListenerAPI<
  State,
  ExtraArgument = unknown
> {
  getOriginalState: () => State
  dispatch:()=> void
  extra: ExtraArgument
}