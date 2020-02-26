FROM gitpod/workspace-full

RUN curl -Lo /tmp/ngrok-stable-linux-386.zip https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-386.zip &&\
  unzip -o /tmp/ngrok-stable-linux-386.zip -d /tmp &&\
  sudo mv /tmp/ngrok /usr/bin &&\
  sudo npm install -g expo-cli

USER gitpod

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
# RUN sudo apt-get -q update && #     sudo apt-get install -yq bastet && #     sudo rm -rf /var/lib/apt/lists/*
#
# More information: https://www.gitpod.io/docs/config-docker/
