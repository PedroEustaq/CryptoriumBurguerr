from bs4 import BeautifulSoup
from PIL import Image
from pathlib import Path
import shutil

ROOT = Path(".")

PASTA_GRANDE = "imgWebP"
PASTA_MOBILE = "imgCelular"

EXTENSOES = (".html", ".htm")

print("=" * 60)
print(" OTIMIZADOR DE HTML")
print("=" * 60)

for arquivo in ROOT.rglob("*"):

    if arquivo.suffix.lower() not in EXTENSOES:
        continue

    print(f"\nProcessando: {arquivo}")

    backup = arquivo.with_suffix(".bak")

    if not backup.exists():
        shutil.copy2(arquivo, backup)

    with open(arquivo, encoding="utf8") as f:
        soup = BeautifulSoup(f, "html.parser")

    imgs = soup.find_all("img")

    primeira = True

    for img in imgs:

        src = img.get("src")

        if not src:
            continue

        if src.endswith(".svg"):
            continue

        if src.startswith("http"):
            continue

        caminho = Path(src)

        if not caminho.exists():
            continue

        try:
            largura, altura = Image.open(caminho).size
        except:
            continue

        img["width"] = str(largura)
        img["height"] = str(altura)

        img["decoding"] = "async"

        nome = caminho.name

        if PASTA_GRANDE in src:

            src_mobile = src.replace(PASTA_GRANDE, PASTA_MOBILE)

            if Path(src_mobile).exists():

                img["srcset"] = f"{src_mobile} {largura}w, {src} {largura*2}w"

                img["sizes"] = f"(max-width:768px) {largura}px, {largura}px"

        if primeira:

            img["fetchpriority"] = "high"

            if "loading" in img.attrs:
                del img["loading"]

            primeira = False

        else:

            img["loading"] = "lazy"

    with open(arquivo, "w", encoding="utf8") as f:
        f.write(str(soup))

print("\n✔ Finalizado!")