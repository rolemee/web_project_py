from pypinyin import lazy_pinyin, Style


def pin_yin_all(character: str) -> list:
    return lazy_pinyin(character)


def pin_yin_first(character: str) -> list:
    return lazy_pinyin(character, style=Style.FIRST_LETTER)
