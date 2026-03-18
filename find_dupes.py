import os
import sys

def get_hashes():
    import urllib.request
    from PIL import Image
    import imagehash
    res = {}
    d = "public/images"
    for f in os.listdir(d):
        if not f.startswith("av_media_"): continue
        path = os.path.join(d, f)
        try:
            img = Image.open(path)
            res[f] = imagehash.phash(img)
        except Exception as e:
            pass
    for k1, v1 in res.items():
        for k2, v2 in res.items():
            if k1 < k2 and v1 - v2 < 10:
                print(f"Similar: {k1} and {k2} (diff {v1 - v2})")

get_hashes()
