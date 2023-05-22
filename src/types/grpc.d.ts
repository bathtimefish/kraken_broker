import { GrpcObject } from "grpc";

interface KrakenGrpcRequest {
  kind: string;
  provider: string;
  payload: string;
}
interface KrakenGrpcResponse {
  status: number;
}
interface KrakenGrpcServer {
  send(call: grpc.ServerUnaryCall<KrakenGrpcRequest>, callback: grpc.sendUnaryData<KrakenGrpcResponse>): void;
}
interface KrakenGrpcClient extends grpc.Client {
  send(call: KrakenGrpcRequest, callback: grpc.sendUnaryData<KrakenGrpcResponse>): void;
}

declare namespace KrakenGrpc {

  namespace proto {
    interface requestMessage {
      type: string,
      provider: string,
      payload: any,
    }
    interface responseMessage {
      status: number,
    }
  }

}
