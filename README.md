# QHUNT API

## Run

```bash
# install
pnpm install

# run
# dont forget to config the hosts
docker compose up -d

pnpm dev

# build
pnpm build

# start
pnpm start
```

## Docker

You can create bash script from this

```bash
sha=$(git rev-parse HEAD)
tag="ghcr.io/{org}/{name}:${sha}"
docker build -t $tag .
docker push $tag
echo "$tag success"
```
