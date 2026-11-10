import React, { useRef, useState } from "react";
import { photos, categories } from "./catalogue.js";
import "./catalogue.css";

export default function Catalogue({ tr }) {
  const [filter, setFilter] = useState("");
  const [index, setIndex] = useState(null);
  const dialog = useRef(null);
  const opener = useRef(null);
  const groups = (filter ? [filter] : categories).map(category => ({
    category,
    photos: photos.filter(photo => photo.category === category),
  }));
  const visible = groups.flatMap(group => group.photos);
  const current = visible[index] ?? visible[0];
  const imageUrl = photo => `${import.meta.env.BASE_URL}images/catalogue/${photo.file}`;
  const move = offset => setIndex(value => (value + offset + visible.length) % visible.length);

  function open(event, position) {
    opener.current = event.currentTarget;
    setIndex(position);
    dialog.current.showModal();
  }

  return (
    <section id="catalogue" className="section soft lsj-catalogue" aria-labelledby="catalogue-title">
      <header className="section-title">
        <h2 id="catalogue-title">{tr("LSJ en images — Activités sur le terrain")}</h2>
        <p>{tr("Des photographies prises sur le terrain pour suivre les activités, les installations et l’évolution progressive du projet LSJ au Bénin.")}</p>
      </header>
      <div className="catalogue-filters" role="group" aria-label={tr("Catégories du catalogue")}>
        {["", ...categories].map(category => (
          <button type="button" key={category} aria-pressed={filter === category} onClick={() => setFilter(category)}>
            {tr(category || "Tout voir")}
          </button>
        ))}
      </div>
      <p className="catalogue-count" role="status">{tr("{count} photographies").replace("{count}", visible.length)}</p>
      <div className="catalogue-groups">
        {groups.map(group => (
          <section className="catalogue-group" key={group.category}>
            <h3>{tr(group.category)}</h3>
            <div className="catalogue-grid">
              {group.photos.map(photo => (
                <button type="button" className="catalogue-card" key={photo.file} onClick={event => open(event, visible.indexOf(photo))}>
                  <span className="catalogue-thumb"><img src={imageUrl(photo)} loading="lazy" decoding="async" alt="" /></span>
                  <span className="catalogue-caption">
                    <small>{photo.file.slice(0, 2)}</small>
                    <strong>{tr(photo.caption)}</strong>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
      <dialog ref={dialog} className="catalogue-dialog" aria-labelledby="catalogue-photo-caption"
        onClose={() => { setIndex(null); opener.current?.focus(); }}
        onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}
        onKeyDown={event => {
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
        }}>
        <div className="catalogue-viewer">
          <button type="button" className="catalogue-close" autoFocus onClick={() => dialog.current.close()}>{tr("Fermer")}</button>
          <img src={index === null ? undefined : imageUrl(current)} alt="" />
          <p id="catalogue-photo-caption" aria-live="polite">{tr(current.caption)}</p>
          <div className="catalogue-controls">
            <button type="button" aria-label={tr("Photo précédente")} onClick={() => move(-1)}>←</button>
            <span>{index + 1} / {visible.length}</span>
            <button type="button" aria-label={tr("Photo suivante")} onClick={() => move(1)}>→</button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
