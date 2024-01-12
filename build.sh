docker rm zola-build
docker run -u "$(id -u):$(id -g)" --name zola-build -v $PWD/docs:/docs --workdir /docs ghcr.io/getzola/zola:v0.17.1 build