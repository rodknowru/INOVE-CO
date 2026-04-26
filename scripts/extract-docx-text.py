#!/usr/bin/env python3
"""Полный текст из .docx: абзацы и ячейки таблиц. Вызывается из sync-products.mjs."""
import sys

import docx


def main() -> None:
    path = sys.argv[1]
    d = docx.Document(path)
    parts: list[str] = []
    for p in d.paragraphs:
        t = p.text.strip()
        if t:
            parts.append(t)
    for tbl in d.tables:
        for row in tbl.rows:
            for cell in row.cells:
                for p in cell.paragraphs:
                    t = p.text.strip()
                    if t:
                        parts.append(t)
    print("\n".join(parts), end="")


if __name__ == "__main__":
    main()
