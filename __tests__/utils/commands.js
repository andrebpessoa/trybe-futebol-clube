const dockerFind = (partialName) => `$(docker ps -qaf name=${partialName})`;

const docker = {
  rm: (containerName) => `docker rm -vf ${dockerFind(containerName)}`,
  exec: (containerName, command, firstLevel = true) =>
    `docker exec ${dockerFind(containerName)} /bin/sh -c ${firstLevel ? `'${command}'` : `"${command}"`}`,
  logs: (containerName) => `docker logs ${dockerFind(containerName)}`
};

const dind = {
  exec: (contextName, command) => docker.exec(contextName, command),
  compose: {
    exec: (contextName, composeApp, command) =>
      docker.exec(
        contextName,
        docker.exec(
          composeApp,
          command,
          false
        )
      ),
    logs: (contextName, composeApp) =>
      docker.exec(
        contextName,
        docker.logs(composeApp)
      )
  }
}

module.exports = {
  dockerFind,
  docker,
  dind
}
