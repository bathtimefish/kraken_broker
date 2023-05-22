# Build Kraken Broker image

```
docker build --build-arg GITHUB_USER=bathtimefish --build-arg GITHUB_TOKEN=31c728b2732d1cc3d6d259d49d0e91b275f920e8 --no-cache -t bathtimefish/kraken-iot-broker:1.0.0 .
```

# Run Collector container using docker commmand

```
docker run --name kraken-broker -p 50055:50055 -p 6006:6006 -v $PWD/assets/config-yaml:/root/config -e KRAKEN_DEBUG=3 -e KRAKEN_ADAPTOR_CONFIG_PATH=/root/config/test-config.yaml -itd bathtimefish/kraken-iot-broker:1.0.0 /bin/ash
```

# Login Collector conainer

```
docker exec -it kraken-broker /bin/ash
```

# exec alpine [experimental usage] 

```
docker pull alpine:3.12.3
docker run --name alpine-test -itd alpine:3.13.0 /bin/ash
docker exec -it alpine-test /bin/ash
```
