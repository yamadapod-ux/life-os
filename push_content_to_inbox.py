import json, datetime, sys
from pathlib import Path

def main():
    if len(sys.argv) < 6:
        print("Usage: push_content_to_inbox.py SLUG DATE FORMAT CFA_CONCEPT TITLE [SCRIPT_FILENAME]")
        print("Example: push_content_to_inbox.py top-down-cpu 2026-05-05 TikTok 'Top-Down Investing' 'CPU ขึ้น คือสัญญาณอะไร'")
        sys.exit(1)

    slug       = sys.argv[1].lower()
    date       = sys.argv[2]
    fmt        = sys.argv[3]
    cfa        = sys.argv[4]
    title      = sys.argv[5]
    script_fn  = sys.argv[6] if len(sys.argv) > 6 else None

    content_dir  = Path("C:/Users/user/Documents/บลจ-CFA/content/scripts")
    inbox_path   = Path("C:/Users/user/Desktop/life-os/inbox.json")
    deadline     = (datetime.date.fromisoformat(date) + datetime.timedelta(days=1)).isoformat()
    item_id      = f"content_{date}_{slug}"

    # Find script file
    full_content = ""
    if script_fn:
        script_path = content_dir / script_fn
    else:
        matches = list(content_dir.glob(f"*{slug}*.md"))
        script_path = matches[0] if matches else None

    if script_path and script_path.exists():
        full_content = script_path.read_text(encoding="utf-8")
        print(f"📄 Read script: {script_path.name} ({len(full_content):,} chars)")
    else:
        print(f"⚠️  Script file not found — fullContent will be empty")

    with open(inbox_path, encoding="utf-8") as f:
        items = json.load(f)

    if any(i["id"] == item_id for i in items):
        print(f"⚠️  {item_id} already in inbox — skipped")
        return

    items.append({
        "id":          item_id,
        "timestamp":   date,
        "source":      "Leo-content — Content Team",
        "cat":         "freelance",
        "title":       f"🎬 Script พร้อม shoot — {title}",
        "note":        f"Format: {fmt} | CFA: {cfa}\nFile: content/scripts/{script_path.name if script_path else slug + '.md'}",
        "deadline":    deadline,
        "fullContent": full_content
    })

    with open(inbox_path, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

    print(f"✅ Added {item_id} to inbox.json")

main()
