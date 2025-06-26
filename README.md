# Skycrate

> [!NOTE]
> This project is now multilingual. To contribute new languages, please read the [translation guide](./TRANSLATION.md).

---

## Versions
- Hadoop: 3.4.1
- Java: 17
- Node: 22.14.0
- NPM: 10.9.2

## How to run?

> [!IMPORTANT]
> You must have [Docker](https://www.docker.com/products/docker-desktop/) and [Git](https://git-scm.com/) installed on your system.

1. Clone this repository:

```shell
git clone https://git.kska.io/notkshitij/Skycrate.git
```

2. Change into the directory:

```shell
cd ./Skycrate
```

3. Create a `.env` file inside the directory containing the following variables:

```env
MYSQL_PASSWORD=<set-a-strong-password>
```

> [!NOTE]
> Please choose a strong password, since it will be used for your MySQL database.

4. Execute the Docker Compose file:

```shell
docker-compose -f docker-compose.yaml up -d
```

> [!TIP]
> Use `-d` flag to run in detached mode.

5. Visit `localhost:8080` to enjoy using Skycrate!

> [!NOTE]
> To stop and remove all the containers, run `docker compose down`

---
