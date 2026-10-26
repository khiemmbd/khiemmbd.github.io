#!/usr/bin/env bash
# Tải toàn bộ ảnh của trang Home S09 từ Figma về thư mục images/.
#   cd ~/Downloads/GP02/S09 && FIGMA_TOKEN=figd_xxx bash download-assets.sh
# - Link /api/mcp/asset/ chỉ sống ~7 ngày kể từ 20/10/2026.
# - FIGMA_TOKEN (Personal access token) dùng để xuất 4 ảnh nhân vật môn phái
#   còn thiếu qua Figma REST API; không có token thì bỏ qua 4 ảnh đó.
set -u
cd "$(dirname "$0")"
mkdir -p images/phai images/phai-ic fonts

M=https://www.figma.com/api/mcp/asset
A=$M/20d18fe4-db91-40f6-b0c5-c224ba58a7b6
B=$M/1eeace70-22ae-4dfc-a2a2-cacb134f6e4c
C=$M/8db97476-36eb-4f7f-af21-2071270e9f52
D=$M/0f54e7b5-efac-4c1f-94af-0f94bdfcfdb1
E=$M/f4546f82-54ad-40e0-8d81-42fe9589d5ac
F=$M/b14ef0a3-dcd2-4aaa-8bba-dec56c3f3cfe

fail=0
get() { # url dest
  if curl -fsSL --retry 2 -o "images/$2" "$1"; then
    echo "  ok  $2"
  else
    echo "  LỖI $2"; fail=$((fail + 1))
  fi
}

echo "Đang tải ảnh…"
get "$A/fd0f1.png" hero-keyart.png
get "$A/01f8c.png" logo.png
get "$A/bf61f.png" side-ngami.png
get "$A/ae938.png" side-panel.png
get "$A/70609.svg" btn-side.svg
get "$A/52963.svg" dl-box.svg
get "$A/36b1a.png" app-icon.png
get "$A/28f3b.svg" ic-googleplay.svg
get "$A/eafce.svg" ic-apple.svg
get "$A/802fd.svg" ic-apk.svg
get "$A/2c7d1.png" coins.png
get "$A/4e0a8.png" glow.png
get "$A/12a34.png" play.png

get "$M/90aad1da-bca7-40c0-85c0-6d4ce1a77ad5.png" hero-title.png
get "$M/1d66aa51-7707-4b66-8701-f52a351d32a1.png" btn-dl-bg.png
get "$M/2d06536a-e071-4ca4-86ec-68e3edcb7ca3.png" naptho-box.png
get "$M/407ecc3d-e26c-4b72-8a40-17dba34e7880.png" title-brown.png
get "$M/384a563c-c7e9-446a-825f-1c72466d1191.png" title-cream.png
get "$M/238365ab-6014-4898-a2ff-e9e48d6685b5.png" tab-bg.png
get "$M/f6eac3b0-c7a7-4abe-9bce-7f5894286082.png" deco-page.png
get "$M/d1241a55-0310-4303-8d05-3bbf84423613.png" deco-bottom.png
get "$M/7f9c06e1-a296-4bfe-bb00-3da587de62da.png" phai-ring.png
get "$M/99eeee39-d3c7-4441-b5b2-c79859b093ef.png" phai/vodang.png
get "$M/7209e887-965e-4496-830d-0c9e60410def.png" phai/thieulam.png
get "$M/7404d41d-2c25-403f-8ee6-22329fa2e7c3.png" phai/caibang.png

get "$B/10f3e.png" news-cover.png
get "$B/8ef02.svg" news-frame.svg
get "$B/b458e.svg" news-line.svg
get "$B/1cbd2.svg" guide-frame.svg
get "$B/32b40.png" card-vodang.png
get "$B/c385f.png" card-thienlong.png
get "$B/aaa58.png" card-tinhtuc.png
get "$B/aaa58.png" phai/tinhtuc.png

get "$C/b7319.png" namecard.png
get "$C/adc54.png" phai/tieudao.png
get "$C/f8e88.png" gameplay.png
get "$C/82b1f.svg" gameplay-frame.svg

get "$D/f38f6.png" slide-1.png
get "$D/3d1d5.png" slide-side-r.png
get "$D/b1e3f.png" slide-side-l.png
get "$D/a72e1.svg" slider-frame.svg
get "$D/6aa48.svg" dot-on.svg
get "$D/28322.svg" dot.svg

get "$E/69a37.png" age18.png
get "$E/554e4.png" gzone.png
get "$E/85edb.svg" gameg1.svg

get "$F/34b0c.png" sel-bg.png
get "$F/7eed0.png" sel-bg-on.png
get "$F/16e34.png" phai-ic/thienlong.png
get "$F/5368b.png" phai-ic/vodang.png
get "$F/b1cd0.png" phai-ic/minhgiao.png
get "$F/9d39e.png" phai-ic/tinhtuc.png
get "$F/71a43.png" phai-ic/thieulam.png
get "$F/bb11d.png" phai-ic/caibang.png
get "$F/0c343.png" phai-ic/tieudao.png
get "$F/1084a.png" phai-ic/ngami.png
get "$F/afe15.png" phai-ic/thienson.png

# ---- 4 ảnh nhân vật còn lại: xuất qua Figma REST API ----
if [ -n "${FIGMA_TOKEN:-}" ]; then
  echo "Xuất ảnh nhân vật qua Figma API…"
  json=$(curl -fsSL -H "X-Figma-Token: $FIGMA_TOKEN" \
    "https://api.figma.com/v1/images/sENN8tZIDMf4k45AiXPaI4?ids=1:939,1:942,1:952,1:953&format=png&scale=1")
  for pair in "1:939 ngami" "1:942 minhgiao" "1:952 thienson" "1:953 thienlong"; do
    id=${pair% *}; name=${pair#* }
    url=$(printf '%s' "$json" | python3 -c 'import sys,json; print((json.load(sys.stdin).get("images") or {}).get(sys.argv[1]) or "")' "$id")
    if [ -n "$url" ]; then get "$url" "phai/$name.png"; else echo "  LỖI phai/$name.png (API không trả ảnh)"; fail=$((fail + 1)); fi
  done
else
  echo "Chưa có FIGMA_TOKEN → bỏ qua phai/ngami, minhgiao, thienson, thienlong."
  fail=$((fail + 4))
fi

echo
if [ "$fail" -eq 0 ]; then echo "Xong, đủ ảnh."; else echo "Xong, $fail ảnh lỗi/thiếu (xem dòng LỖI)."; fi
echo "Font: chép UTM-Alexander.ttf và FzKNGame.ttf vào thư mục fonts/ (nếu có bản quyền)."
