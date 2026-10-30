#!/usr/bin/env bash
# Tải ảnh trang Đăng Ký Trước S09 từ Figma (file rxoYXfKjZMGb4xDwe3X7ll) về images/.
#   bash download-assets.sh
# Link /api/mcp/asset/ chỉ sống ~7 ngày kể từ 26/10/2026.
set -u
cd "$(dirname "$0")"
mkdir -p images

M=https://www.figma.com/api/mcp/asset
A=$M/f1e1b023-22cb-46ae-9d6e-5e0318536b73   # Landing PC
B=$M/0aad7c05-244e-495e-ada5-cd446765d74c   # Mobile
C=$M/a934f15e-02f9-4037-abe5-91fa780a7d9e   # Popup

fail=0
get() { # url dest
  if curl -fsSL --retry 2 -o "images/$2" "$1"; then echo "  ok  $2"; else echo "  LỖI $2"; fail=$((fail + 1)); fi
}

echo "Đang tải ảnh…"
# hero
get "$A/50727.png" hero-title-tex.png
get "$A/e559d.svg" hero-title-mask.svg
get "$A/0a05e.png" hero-pc.png
get "$B/48fe1.png" hero-mb.png
get "$A/01f8c.png" logo.png
get "$A/4e0a8.png" glow.png
get "$A/12a34.png" play.png
get "$A/2dc0e.png" btn-reg.png
# nền
get "$A/25344.png" title-mask.png
get "$A/a7061.png" deco-bottom.png
get "$A/02f5d.svg" deco-bottom-mask.svg
get "$B/64ef3.svg" deco-bottom-mb-mask.svg
get "$A/6ddd6.png" bg-levels.png
get "$B/7e9ba.png" bg-mb-mid.png
# đăng ký sớm
get "$A/a2bb7.svg" light-1.svg
get "$A/02e98.svg" light-2.svg
get "$A/976af.png" step-card.png
get "$M/5ce01f20-f866-4406-9662-15064e261dcc.png" btn-gold.png
get "$A/5a677.svg" ic-googleplay.svg
get "$A/99bf8.svg" ic-apple.svg
get "$A/774d0.svg" ic-facebook.svg
get "$A/a70cd.svg" ic-group.svg
get "$A/77883.svg" gift-box.svg
get "$B/6523d.svg" gift-box-mb.svg
get "$A/2f3cb.png" gift-title.png
get "$A/bf2ab.png" items-a.png
get "$A/5349b.png" items-b.png
get "$A/77092.png" item-frame.png
# quần hùng báo danh
get "$A/45c86.png" qh-paper.png
get "$A/5d102.png" qh-banner.png
get "$M/fa3154bd-231f-460d-aefa-5920c8aeafd5.png" qh-progress.png
get "$A/c409b.png" qh-mark.png
get "$A/96d2e.png" qh-chest.png
get "$A/5134b.png" btn-reg-sm.png
get "$A/0223e.png" thieulam.png
# tầm bảo
get "$A/cd35c.png" tb-platform.png
get "$A/e116f.png" tb-glow.png
get "$A/96867.png" tb-chest-main.png
get "$A/7e587.png" tb-chest-1.png
get "$A/6dc1a.png" tb-chest-2.png
get "$A/483d9.png" tb-chest-3.png
get "$A/24e93.png" tb-chest-4.png
get "$A/39232.svg" tb-ray.svg
get "$A/ec969.svg" tb-ray-main.svg
get "$A/7592b.svg" tb-ray-2.svg
get "$A/cfd29.png" task-icon.png
get "$A/b116f.svg" btn-nhan.svg
get "$A/75e26.svg" task-line.svg
# đặc sắc
get "$A/f38f6.png" slide-1.png
get "$A/3d1d5.png" slide-side-r.png
get "$A/b1e3f.png" slide-side-l.png
get "$A/a72e1.svg" slider-frame.svg
get "$A/6aa48.svg" dot-on.svg
get "$A/28322.svg" dot.svg
# footer
get "$A/e28d9.png" skyway.png
get "$A/69a37.png" age18.png
get "$A/bec4c.svg" gameg1.svg
# popup
get "$C/14693.png" pop-frame.png
get "$C/267bb.png" pop-title.png
get "$C/2e7e9.png" pop-btn.png

# quầng sáng nền đen (Figma dùng blend screen) → đổi nền đen thành trong suốt,
# vì khối .tb có transform nên mix-blend-mode không hoà được với nền trang
python3 - <<'EOF'
from PIL import Image
import numpy as np
a = np.asarray(Image.open('images/tb-glow.png').convert('RGB')).astype(float) / 255
al = a.max(axis=2)
rgb = np.where(al[..., None] > 0, a / np.maximum(al[..., None], 1e-6), 0)
Image.fromarray((np.dstack([rgb, al]) * 255).round().astype('uint8'), 'RGBA').save('images/tb-glow.png', optimize=True)
EOF

echo
if [ "$fail" -eq 0 ]; then echo "Xong, đủ ảnh."; else echo "Xong, $fail ảnh lỗi (xem dòng LỖI)."; fi
