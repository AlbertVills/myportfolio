import subprocess
import os
import time

edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

with open("index.html", "r", encoding="utf-8") as f:
    c = f.read()

c_light = c.replace('class="dark scroll-smooth"', 'class="light scroll-smooth"')
c_light = c_light.replace('localStorage.getItem("av_theme") || "dark"', '"light"')

with open("index_light_test.html", "w", encoding="utf-8") as f:
    f.write(c_light)

server = subprocess.Popen(["python", "-m", "http.server", "4130"])
time.sleep(1)

out_png = os.path.abspath(r"assets\images\hero_light_fixed_test.png")
cmd = [edge_exe, "--headless", "--disable-gpu", "--window-size=1440,900", f"--screenshot={out_png}", "http://localhost:4130/index_light_test.html"]
subprocess.run(cmd, capture_output=True, text=True)

server.terminate()
if os.path.exists("index_light_test.html"):
    os.remove("index_light_test.html")

from PIL import Image
if os.path.exists(out_png):
    im = Image.open(out_png)
    print("Light mode test screenshot:", im.size)
    print("Background at (100, 200):", im.getpixel((100, 200)))
    print("Logo at (100, 40):", im.getpixel((100, 40)))
    print("Nav link at (600, 40):", im.getpixel((600, 40)))
    print("Headline text at (200, 350):", im.getpixel((200, 350)))
    print("Quote text at (1100, 350):", im.getpixel((1100, 350)))
    print("Bottom row at (100, 840):", im.getpixel((100, 840)))
    im.save(r"assets\images\hero_light_fixed_preview.jpg", quality=92)
    print("Saved hero_light_fixed_preview.jpg")
