import { KeyGenerator, Signer } from "ecdsa-wasm";
export { KeyGenerator, Signer } from "ecdsa-wasm";

export enum SessionKind {
  KEYGEN = "keygen",
  SIGN = "sign",
}

export interface EcdsaWorker {
  KeyGenerator(
    parameters: Parameters,
    partySignup: PartySignup
  ): Promise<KeyGenerator>;

  Signer(
    index: number,
    participants: number[],
    localKey: LocalKey
  ): Promise<Signer>;

  sha256(value: string): Promise<string>;
}

// Message is sent by a client.
//
// When receiver is null then the message is a broadcast round
// otherwise communication should be handled peer to peer.
export interface Message {
  round: number;
  sender: number;
  uuid: string;
  receiver?: number;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  body: any;
}

// Configuration parameters retrieved from the server
// during the handshake.
export interface Parameters {
  parties: number;
  threshold: number;
}

// Private key share for GG2020.
export interface KeyShare {
  localKey: LocalKey;
  publicKey: number[];
  address: string;
}

// Opaque type for the private key share.
export interface LocalKey {
  // Index of the key share.
  i: number;
  // Threshold for key share signing.
  t: number;
  // Total number of parties.
  n: number;
}

// Generated by the server to signal this party wants
// to be included in key generation.
//
// The uuid is injected from the session that owns
// this party signup.
export interface PartySignup {
  number: number;
  uuid: string;
}

export interface Session {
  uuid: string;
  partySignup?: PartySignup;
}

// State for party signup round during keygen.
export interface PartySignupInfo {
  parameters: Parameters;
  partySignup: PartySignup;
}

export interface SessionInfo {
  groupId: string;
  sessionId: string;
  parameters: Parameters;
  partySignup: PartySignup;
}

// Result of signing a message.
export interface SignResult {
  r: string;
  s: string;
  recid: number;
}

// A signed message with public key and address pre-computed.
export interface SignMessage {
  signature: SignResult;
  public_key: number[];
  address: string;
}
