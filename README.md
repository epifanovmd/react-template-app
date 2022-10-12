# React Boilerplate

React Redux Server Side Rendering Application

##### Stack:
  - Typescript
  - React
  - React Router
  - React-Redux
  - Redux Thunk
  - Redux Toolkit
  - Reselect
  - i18next
  - Express (SSR)
  - Luxon
  - Loadable Component (for code splitting)
  - CSS Modules
  - Styled Components

### Installation
```sh
$ git clone https://github.com/epifanovmd/react-template-app.git
$ cd react-template-app
$ yarn
```

### Run
```sh
$ yarn prod:ssr
```
```sh
Application listening on: http://localhost:8080
```

### Start app in docker container (without Server Side Rendering)
```sh
$ docker build -t lending:latest .
$ [[ $(docker ps -f name=lending_container -q -a) != '' ]] && docker rm --force $(docker ps -f name=lending_container -q -a)
$ docker run -u root -d --restart=always --network server-net -p 8080:80 --name lending_container lending:latest
$ docker image prune -a --force
```
```sh
Application listening on: http://localhost:8080
```

### Start app in docker container (with Server Side Rendering)
```sh
$ docker build -f DockerfileSSR -t lending_ssr:latest .
$ [[ $(docker ps -f name=lending_ssr_container -q -a) != '' ]] && docker rm --force $(docker ps -f name=lending_ssr_container -q -a)
$ docker run -u root -d --restart=always --network server-net -p 8083:8180 --name lending_ssr_container lending_ssr:latest
$ docker image prune -a --force
```


```sh
Application listening on: http://localhost:8080
```

License
----

MIT

**Free Software, Good Work!**
