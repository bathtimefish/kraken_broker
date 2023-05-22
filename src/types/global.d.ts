// https://stackoverflow.com/questions/68481686/type-typeof-globalthis-has-no-index-signature
export {};
declare global {
  var kraken: KrakenConfig;
}

declare namespace NodeJS {
  interface ProcessEnv {
    // Core
    KRAKEN_DEBUG: string;
    // GRPC
    KRAKEN_GRPC_HOST: string;
    KRAKEN_GRPC_PORT: string;
    // Adaptor Config YAML file path
    KRAKEN_ADAPTOR_CONFIG_PATH: string;
  }
}
