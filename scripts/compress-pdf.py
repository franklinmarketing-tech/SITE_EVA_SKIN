"""Recomprime as imagens dentro do guia PDF para reduzir o tamanho."""
import io
import sys
from pathlib import Path

import fitz
from PIL import Image

SRC = Path("public/guia-eva-skin.pdf")
DST = Path("public/guia-eva-skin.pdf")
MAX_DIM = 1800
JPEG_QUALITY = 78

doc = fitz.open(SRC)
original_size = SRC.stat().st_size
print(f"PDF original: {original_size/1024/1024:.1f} MB, {len(doc)} paginas")

processed = set()
total_before = 0
total_after = 0

for page_num, page in enumerate(doc):
    for img in page.get_images(full=True):
        xref = img[0]
        if xref in processed:
            continue
        processed.add(xref)

        info = doc.extract_image(xref)
        original_bytes = info["image"]
        total_before += len(original_bytes)

        try:
            pixmap = Image.open(io.BytesIO(original_bytes))
        except Exception as exc:
            print(f"  [skip xref={xref}] nao consegui abrir: {exc}")
            total_after += len(original_bytes)
            continue

        original_mode = pixmap.mode
        original_size_px = pixmap.size

        if max(pixmap.size) > MAX_DIM:
            ratio = MAX_DIM / max(pixmap.size)
            new_size = (int(pixmap.size[0] * ratio), int(pixmap.size[1] * ratio))
            pixmap = pixmap.resize(new_size, Image.LANCZOS)

        if pixmap.mode in ("RGBA", "P", "LA"):
            background = Image.new("RGB", pixmap.size, (255, 255, 255))
            if pixmap.mode == "P":
                pixmap = pixmap.convert("RGBA")
            background.paste(pixmap, mask=pixmap.split()[-1] if pixmap.mode in ("RGBA", "LA") else None)
            pixmap = background
        elif pixmap.mode != "RGB":
            pixmap = pixmap.convert("RGB")

        buf = io.BytesIO()
        pixmap.save(buf, format="JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
        new_bytes = buf.getvalue()
        total_after += len(new_bytes)

        doc.update_stream(xref, new_bytes)

        print(f"  xref={xref} pag={page_num+1} mode={original_mode} "
              f"{original_size_px[0]}x{original_size_px[1]} -> {pixmap.size[0]}x{pixmap.size[1]} | "
              f"{len(original_bytes)/1024:.0f} KB -> {len(new_bytes)/1024:.0f} KB")

print(f"\nTotal imagens: {total_before/1024/1024:.1f} MB -> {total_after/1024/1024:.1f} MB "
      f"(reducao {(1 - total_after/total_before)*100:.0f}%)")

doc.save(str(DST) + ".new", garbage=4, deflate=True, clean=True)
doc.close()

new_path = Path(str(DST) + ".new")
new_size = new_path.stat().st_size
print(f"\nPDF final: {new_size/1024/1024:.1f} MB "
      f"(reducao total {(1 - new_size/original_size)*100:.0f}%)")

# Substitui o original
new_path.replace(DST)
print(f"Salvo em {DST}")
