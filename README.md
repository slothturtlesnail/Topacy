# README

```shell
docker build --platform linux/amd64 -t topacy-static:latest -f Dockerfile .
docker tag topacy-static:latest registry.intelliworks.ca/topacy-static:latest
docker push registry.intelliworks.ca/topacy-static:latest
```