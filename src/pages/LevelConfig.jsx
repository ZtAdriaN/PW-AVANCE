// src/pages/LevelConfig.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./LevelConfig.css";

const KEY = (id) => `levelConfig_${id}`;

function genLinear(n, base, inc) {
  const arr = [];
  let acc = base;
  for (let i = 0; i < n; i++) { arr.push(Math.max(1, Math.round(acc))); acc += inc; }
  return arr;
}

function genExponential(n, base, mul) {
  const arr = [];
  let x = base;
  for (let i = 0; i < n; i++) { arr.push(Math.max(1, Math.round(x))); x *= mul; }
  return arr;
}

export default function LevelConfig() {
  const { user } = useContext(AuthContext);
  const [levels, setLevels] = useState(10);
  const [base, setBase] = useState(100);
  const [mode, setMode] = useState("linear"); // linear | exponential
  const [inc, setInc] = useState(50);
  const [mul, setMul] = useState(1.5);
  const [table, setTable] = useState([]);
  const [saved, setSaved] = useState(false);

  // Cargar
  useEffect(() => {
    if (!user?.id) return;
    const cfg = JSON.parse(localStorage.getItem(KEY(user.id)) || "null");
    if (cfg?.table?.length) {
      setTable(cfg.table);
      setLevels(cfg.table.length);
      setBase(cfg.base ?? 100);
      setMode(cfg.mode ?? "linear");
      setInc(cfg.inc ?? 50);
      setMul(cfg.mul ?? 1.5);
    } else {
      setTable(genLinear(levels, base, inc));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const regenerate = () => {
    const next = mode === "linear" ? genLinear(levels, base, inc) : genExponential(levels, base, mul);
    setTable(next);
    setSaved(false);
  };

  const updateCell = (idx, val) => {
    const n = Math.max(1, Math.round(Number(val) || 0));
    setTable((t) => t.map((v, i) => (i === idx ? n : v)));
    setSaved(false);
  };

  const save = () => {
    const payload = { mode, base, inc, mul, table };
    localStorage.setItem(KEY(user.id), JSON.stringify(payload));
    setSaved(true);
  };

  return (
    <div className="lc-wrap">
      <h1 className="lc-title">Configuración de niveles (puntos requeridos)</h1>

      <section className="lc-card lc-grid">
        <div className="lc-field">
          <label htmlFor="levels">Niveles</label>
          <input id="levels" type="number" min="1" max="50" value={levels} onChange={(e) => setLevels(Number(e.target.value))} />
        </div>

        <div className="lc-field">
          <label htmlFor="base">Puntos Nivel 1 (base)</label>
          <input id="base" type="number" min="1" step="1" value={base} onChange={(e) => setBase(Number(e.target.value))} />
        </div>

        <div className="lc-field">
          <label htmlFor="mode">Crecimiento</label>
          <select id="mode" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="linear">Lineal (+incremento)</option>
            <option value="exponential">Exponencial (×multiplicador)</option>
          </select>
        </div>

        {mode === "linear" ? (
          <div className="lc-field">
            <label htmlFor="inc">Incremento</label>
            <input id="inc" type="number" step="1" value={inc} onChange={(e) => setInc(Number(e.target.value))} />
          </div>
        ) : (
          <div className="lc-field">
            <label htmlFor="mul">Multiplicador</label>
            <input id="mul" type="number" step="0.1" value={mul} onChange={(e) => setMul(Number(e.target.value))} />
          </div>
        )}

        <div className="lc-actions">
          <button className="lc-btn" onClick={regenerate}>Generar tabla</button>
          <button className="lc-btn primary" onClick={save}>Guardar</button>
          {saved && <span className="lc-saved">✓ Guardado</span>}
        </div>
      </section>

      <section className="lc-card">
        <h2 className="lc-subtitle">Tabla de puntos requeridos por nivel</h2>
        <div className="lc-table">
          <div className="lc-th">Nivel</div>
          <div className="lc-th">Puntos requeridos</div>
          {Array.from({ length: levels }).map((_, i) => (
            <React.Fragment key={i}>
              <div className="lc-td">L{i + 1}</div>
              <div className="lc-td">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={table[i] ?? ""}
                  onChange={(e) => updateCell(i, e.target.value)}
                  aria-label={`Puntos requeridos para nivel ${i + 1}`}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <p className="lc-hint">
          Esta configuración se guarda por streamer en <code>localStorage</code> (clave <code>levelConfig_&lt;idStreamer&gt;</code>). 
          Los espectadores de este canal deberán usar esta tabla para calcular su “falta para el siguiente nivel”.
        </p>
      </section>
    </div>
  );
}
