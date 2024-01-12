docker rm zola-build
docker run -u "$(id -u):$(id -g)" --name zola-build -v $PWD/docs_2:/docs_2 --workdir /docs_2 ghcr.io/getzola/zola:v0.17.1 build