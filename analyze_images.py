import os
from PIL import Image

def analyze_images(folder="public/images"):
    for file in os.listdir(folder):
        if not file.startswith("av_media_"): continue
        path = os.path.join(folder, file)
        try:
            img = Image.open(path).convert('RGB')
            w, h = img.size
            pixels = list(img.getdata())
            # Calculate brightness
            avg_brightness = sum(sum(p) / 3 for p in pixels) / len(pixels)
            # Calculate colorfulness (variance of RGB)
            import math
            colorfulness = sum(max(p) - min(p) for p in pixels) / len(pixels)
            print(f"{file} ({w}x{h}): brightness={avg_brightness:.1f}, colorfulness={colorfulness:.1f}")
        except Exception as e:
            print(f"Failed {file}: {e}")

analyze_images()
