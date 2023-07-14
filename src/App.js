import './App.css';
import { useState, useCallback } from "react";
import Poopy from "./components/Poopy";
import Dad from "./components/Dad";
import addNotification from 'react-push-notification';
import Particles from "react-particles";
import { loadFull } from "tsparticles";


function App() {
  const [poopy, setPoopy] = useState("");

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {(poopy === "") ? <>
          <button class="home" onClick={() => {setPoopy(true)}}>I am Poopy</button>
          <button class="home" onClick={() => {setPoopy(false)}}>I am Rick Alan Feese born April 2nd 1975 age 48</button>
        </> : <><button class="back" onClick={() => {setPoopy("")}}>Back</button> {(poopy) ? <Poopy/> : <Dad/>}</>}
      </header>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "emitter",
              },
            },
            modes: {
              emitters: {
                direction: "none",
                spawnColor: {
                  value: "#ff0000",
                  animation: {
                    h: {
                      enable: true,
                      offset: {
                        min: -1.4,
                        max: 1.4,
                      },
                      speed: 0.1,
                      sync: false,
                    },
                    l: {
                      enable: true,
                      offset: {
                        min: 20,
                        max: 80,
                      },
                      speed: 0,
                      sync: false,
                    },
                  },
                },
                life: {
                  count: 1,
                  duration: 0.1,
                  delay: 0.6,
                },
                rate: {
                  delay: 0.1,
                  quantity: 100,
                },
                size: {
                  width: 0,
                  height: 0,
                },
              },
            },
          },
          particles: {
            number: {
              value: 0,
            },
            color: {
              value: "#f00",
            },
            shape: {
              type: ["circle", "square", "polygon"],
              options: {
                polygon: {
                  sides: 6,
                },
              },
            },
            opacity: {
              value: {
                min: 0,
                max: 1,
              },
              animation: {
                enable: true,
                speed: 1,
                startValue: "max",
                destroy: "min",
              },
            },
            size: {
              value: {
                min: 3,
                max: 7,
              },
            },
            life: {
              duration: {
                sync: true,
                value: 7,
              },
              count: 1,
            },
            move: {
              enable: true,
              gravity: {
                enable: true,
              },
              drift: {
                min: -2,
                max: 2,
              },
              speed: {
                min: 10,
                max: 30,
              },
              decay: 0.1,
              direction: "none",
              random: false,
              straight: false,
              outModes: {
                default: "destroy",
                top: "none",
              },
            },
            rotate: {
              value: {
                  min: 0,
                  max: 360,
              },
              direction: "random",
              move: true,
              animation: {
                  enable: true,
                  speed: 60,
              },
            },
            tilt: {
              direction: "random",
              enable: true,
              move: true,
              value: {
                min: 0,
                max: 360,
              },
              animation: {
                enable: true,
                speed: 60,
              },
            },
            roll: {
              darken: {
                enable: true,
                value: 25,
              },
              enable: true,
              speed: {
                min: 15,
                max: 25,
              },
            },
            wobble: {
              distance: 30,
              enable: true,
              move: true,
              speed: {
                min: -15,
                max: 15,
            },
          },
        },
        detectRetina: true,
      }}
    />
    </div>
  );
}

export default App;
