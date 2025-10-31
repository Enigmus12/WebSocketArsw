# WebSocket ARSW - Interactive Drawing Board

Aplicación web colaborativa en tiempo real que permite a múltiples usuarios dibujar simultáneamente en un canvas compartido usando WebSockets.

## Descripción

Esta aplicación implementa un tablero de dibujo interactivo donde varios usuarios pueden conectarse y dibujar en tiempo real. Los trazos de cada usuario se sincronizan automáticamente con todos los demás clientes conectados mediante WebSockets.

### Tecnologías Utilizadas

- **Backend:**
  - Spring Boot 3.1.1
  - Jakarta WebSocket API
  - Java 17
  - Maven

- **Frontend:**
  - React 18
  - P5.js (canvas y dibujo)
  - WebSocket API nativa del navegador

## Requisitos Previos

- Java JDK 17 o superior
- Maven 3.6+
- Navegador web moderno (Chrome, Firefox, Edge, Safari)

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Enigmus12/WebSocketArsw.git
cd WebSocketArsw/Websockets
```

### 2. Compilar el proyecto

```bash
mvn clean install
```

### 3. Ejecutar la aplicación

```bash
mvn spring-boot:run
```

La aplicación estará disponible en: 
`http://54.208.130.243:8080/`

## Uso

1. Abre tu navegador en `http://54.208.130.243:8080/`
2. Haz clic y arrastra el mouse sobre el canvas para dibujar
3. Abre otra pestaña o navegador en la misma URL
4. Los dibujos se sincronizarán automáticamente entre todas las sesiones

## Arquitectura

### Estructura del Proyecto

```
Websockets/
├── src/
│   └── main/
│       ├── java/
│       │   └── eci/edu/co/
│       │       ├── BBAppStarter.java          # Clase principal Spring Boot
│       │       ├── configurator/
│       │       │   └── BBConfigurator.java    # Configuración WebSocket
│       │       ├── controller/
│       │       │   └── DrawingServiceController.java
│       │       └── endpoints/
│       │           └── BBEndpoint.java        # WebSocket endpoint
│       └── resources/
│           ├── static/
│           │   ├── index.html                 # Página principal
│           │   └── js/
│           │       └── bbComponents.jsx       # Componentes React
│           └── applicaction.properties        # Configuración del servidor
└── pom.xml
```

### Componentes Principales

#### Backend

- **`BBEndpoint.java`**: Maneja las conexiones WebSocket, recibe puntos de dibujo y los distribuye a todos los clientes conectados.
- **`BBConfigurator.java`**: Configura el `ServerEndpointExporter` para registrar los endpoints WebSocket.
- **`BBAppStarter.java`**: Clase principal que inicia la aplicación Spring Boot.

#### Frontend

- **`BBCanvas`**: Componente React que renderiza el canvas P5.js y maneja la conexión WebSocket.
- **`WSBBChannel`**: Clase que encapsula la lógica de comunicación WebSocket.

### Flujo de Datos

1. Usuario dibuja en el canvas (evento mousePressed en P5.js)
2. Coordenadas (x, y) se envían al servidor vía WebSocket
3. `BBEndpoint` recibe el mensaje y lo retransmite a todos los clientes conectados
4. Cada cliente recibe las coordenadas y dibuja el punto en su canvas

### Comandos para EC2

```bash
# Actualizar sistema
sudo yum update -y

# Instalar Java 17
sudo yum install maven

# Instalar git
sudo yum install git

# Clonar y ejecutar
git clone https://github.com/Enigmus12/WebSocketArsw.git

cd WebSocketArsw/Websockets

mvn clean package

mvn spring-boot:run
```



## Licencia

Este proyecto es parte del curso ARSW (Arquitecturas de Software) - Escuela Colombiana de Ingeniería Julio Garavito.

## Autor

Juan David Rodriguez
