# Microblog

Censorship-resistant micro-blogging where users can subscribe to many event streams and launch their own. 

## Development

### Setup

1. Clone or fork the repository.
2. Install [Docker](https://docs.docker.com/get-docker/) and [Reach](https://docs.reach.sh/quickstart/). 

### Configuration

Configure app to deploy on Algorand:

```zsh
export REACH_CONNECTOR_MODE=ALGO 
```

### Run Application

To run the app on a local docker container (default port 3000):

```zsh
./reach react
```
