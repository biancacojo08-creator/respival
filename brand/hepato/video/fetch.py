# Descarcă fișierele din talk/jobs.json în talk/<id>/ (sare peste cele deja descărcate sau încă negata).
import json, os, subprocess
D = os.path.dirname(os.path.abspath(__file__)); G = 'https://images.segmind.com/generations/288ae3cf-f8ab-4923-a426-f05ea3f3d3f2'
for tag, files in json.load(open(f'{D}/talk/jobs.json')).items():
    if tag.startswith('_'): continue
    os.makedirs(f'{D}/talk/{tag}', exist_ok=True)
    for name, rid in files.items():
        dst = f'{D}/talk/{tag}/{name}'
        if os.path.exists(dst): continue
        r = subprocess.run(['curl', '-sSf', '-o', dst, f"{G}/{rid}.{name.split('.')[-1]}"], capture_output=True)
        print(tag, name, 'ok' if r.returncode == 0 else 'not ready')
