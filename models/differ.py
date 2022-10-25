import difflib


def differ_num(s1: str, s2: str) -> float:
    return difflib.SequenceMatcher(None, s1, s2).quick_ratio()
