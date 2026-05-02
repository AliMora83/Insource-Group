import { PURPLE } from "../../constants/theme";
import { VALUES } from "../../constants/data";

export function Ticker() {
  return (
    <div style={{ background:PURPLE, padding:"15px 0", overflow:"hidden" }}>
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...VALUES,...VALUES,...VALUES,...VALUES].map((v,i) => (
            <div key={i} className="ticker-item">
              <span style={{ width:5, height:5, borderRadius:"50%", background:"rgba(255,255,255,.45)", display:"block" }} />
              {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
