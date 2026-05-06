import json, datetime, sys

def main():
    if len(sys.argv) < 4:
        print("Usage: push_to_inbox.py TICKER DATE REC [CONVICTION] [THESIS]")
        print("Example: push_to_inbox.py STRL 2026-05-07 HOLD 6.0 'Sterling Infrastructure thesis'")
        sys.exit(1)

    ticker  = sys.argv[1].upper()
    date    = sys.argv[2]
    rec     = sys.argv[3].upper()
    conv    = sys.argv[4] if len(sys.argv) > 4 else "?"
    thesis  = sys.argv[5] if len(sys.argv) > 5 else "ดูรายละเอียดใน report"

    report_path = f"C:/Users/user/Desktop/บลจ/บลจ CFA/reports/{ticker}_{date}.md"
    inbox_path  = "C:/Users/user/Desktop/life-os/inbox.json"
    deadline    = (datetime.date.fromisoformat(date) + datetime.timedelta(days=2)).isoformat()

    with open(report_path, encoding="utf-8") as f:
        full_content = f.read()

    with open(inbox_path, encoding="utf-8") as f:
        items = json.load(f)

    item_id = f"{ticker}_{date}"
    if any(i["id"] == item_id for i in items):
        print(f"⚠️  {item_id} already in inbox — skipped")
        return

    items.append({
        "id":          item_id,
        "timestamp":   date,
        "source":      "Leo — Investment Team",
        "cat":         "investment",
        "title":       f"📊 {ticker} Report พร้อมแล้ว — {rec}",
        "note":        f"Conviction {conv}/10 | {thesis}\nFile: reports/{ticker}_{date}.md",
        "deadline":    deadline,
        "fullContent": full_content
    })

    with open(inbox_path, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

    print(f"✅ Added {item_id} to inbox.json ({len(full_content):,} chars)")

main()
