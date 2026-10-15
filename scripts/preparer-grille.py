"""Prépare un fond de grille à partir du PDF officiel de l'INRS.

Le PDF fourni par l'INRS est un formulaire protégé (sans mot de passe d'ouverture).
Ce script en garde uniquement les deux pages imprimées : les champs de formulaire,
le JavaScript et les métadonnées sont retirés. L'application écrit ensuite les
informations de l'apprenti aux emplacements exacts des champs d'origine.

Usage : python3 scripts/preparer-grille.py grille-inrs.pdf public/grilles/grille-certification-sst-initiale.pdf "Formation initiale (INRS, juin 2020)"
"""
import sys

from pypdf import PdfReader, PdfWriter


def main(src: str, dest: str, label: str) -> None:
    reader = PdfReader(src)
    if reader.is_encrypted:
        reader.decrypt('')
    writer = PdfWriter()
    for page in reader.pages:
        for key in ('/Annots', '/AA', '/StructParents', '/PieceInfo', '/Tabs'):
            if key in page:
                del page[key]
        writer.add_page(page)
    for page in writer.pages:
        page.compress_content_streams()
    writer.add_metadata({'/Title': f'Grille de certification des compétences du SST – {label}', '/Producer': 'Mon espace SST'})
    with open(dest, 'wb') as f:
        writer.write(f)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else 'Formation initiale')
