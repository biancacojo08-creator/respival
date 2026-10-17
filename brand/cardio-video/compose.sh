#!/bin/sh
# Builds final/cardio-noaptea-4x5.mp4: night clip -> morning clip -> end card, with captions.
set -e
cd "$(dirname "$0")"
mkdir -p final
S='scale=1080:1350:force_original_aspect_ratio=increase,crop=1080:1350,fps=30,format=yuv420p,setsar=1'
ffmpeg -v error -y \
  -i src/noapte.mp4 -i src/dimineata.mp4 -loop 1 -t 3.6 -i ov/end.png \
  -i ov/t1.png -i ov/t2.png -i ov/t3.png -i ov/t4.png \
  -f lavfi -t 14.2 -i anullsrc=r=44100:cl=stereo \
  -filter_complex "
    [0:v]$S[a];[1:v]$S[b];[2:v]$S,zoompan=z='1+0.0006*on':d=1:s=1080x1350:fps=30[e];
    [a][b]xfade=transition=fade:duration=0.6:offset=5.25[ab];
    [ab][e]xfade=transition=fade:duration=0.5:offset=10.55[v0];
    [v0][3:v]overlay=enable='between(t,0.3,3.0)'[v1];
    [v1][4:v]overlay=enable='between(t,3.0,5.3)'[v2];
    [v2][5:v]overlay=enable='between(t,5.9,8.2)'[v3];
    [v3][6:v]overlay=enable='between(t,8.2,10.5)'[v]" \
  -map '[v]' -map 7:a -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -c:a aac -shortest -movflags +faststart \
  final/cardio-noaptea-4x5.mp4
