// --- Configuración de WebSocket ---
function BBServiceURL() {
  return 'ws://localhost:8080/bbService';
}

class WSBBChannel {
  constructor(URL, callback) {
    this.URL = URL;
    this.wsocket = new WebSocket(URL);
    this.wsocket.onopen = (evt) => this.onOpen(evt);
    this.wsocket.onmessage = (evt) => this.onMessage(evt);
    this.wsocket.onerror = (evt) => this.onError(evt);
    this.receivef = callback;
  }

  onOpen(evt) { console.log("In onOpen", evt); }

  onMessage(evt) {
    if (evt.data !== "Connection established.") {
      this.receivef(evt.data);
    }
  }

  onError(evt) { console.error("In onError", evt); }

  send(x, y) {
    let msg = '{ "x": ' + x + ', "y": ' + y + "}";
    this.wsocket.send(msg);
  }

  close() {
    this.wsocket.close();
  }
}

// --- Componente Canvas con conexión WebSocket ---
function BBCanvas() {
  const [svrStatus, setSvrStatus] = React.useState({loadingState: 'Loading Canvas...'});
  const comunicationWS = React.useRef(null);
  const myp5 = React.useRef(null);

  function drawPoint(x, y) {
    myp5.current.ellipse(x, y, 20, 20);
  }

  const sketch = function (p) {
    p.setup = function () {
      p.createCanvas(700, 410);
    }

    p.draw = function () {
      if (p.mouseIsPressed === true) {
        p.fill(0);
        p.ellipse(p.mouseX, p.mouseY, 20, 20);
        comunicationWS.current.send(p.mouseX, p.mouseY);
      }
    }
  };

  React.useEffect(() => {
    myp5.current = new p5(sketch, 'container');
    setSvrStatus({loadingState: 'Canvas Loaded'});

    comunicationWS.current = new WSBBChannel(BBServiceURL(), (msg) => {
      var obj = JSON.parse(msg);
      drawPoint(obj.x, obj.y);
    });

    return () => {
      console.log('Closing connection ...');
      comunicationWS.current.close();
    };
  }, []);

  return (
    <div>
      <h4>Drawing status: {svrStatus.loadingState}</h4>
    </div>
  );
}

// --- Editor principal ---
function Editor({ name }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <hr/>
      <div id="toolstatus"></div>
      <hr/>
      <div id="container"><BBCanvas /></div>
      <hr/>
      <div id="info"></div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Editor name="Juanito" />);
