# Free, local word timing for subtitles: no ASR. The script text is known, so we find where the
# voice actually speaks (ffmpeg silencedetect on the avatar video) and spread the words over the
# voiced time only, weighted by spoken length. Pauses therefore stay empty and phrases restart with the voice.
# Usage: python3 subs.py V01 [V02 ...]   -> writes subs/<id>.json
import json, os, re, subprocess, sys

D = os.path.dirname(os.path.abspath(__file__))
SPOKEN = {'20': 'douăzeci', '10': 'zece', '40': 'patruzeci', '45': 'patruzecișicinci'}  # digits shown, words spoken
MAX_WORDS, MAX_CHARS = 3, 18


def silences(path):
    out = subprocess.run(['ffmpeg', '-i', path, '-af', 'silencedetect=noise=-32dB:d=0.12', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    h, m, sec = re.search(r'Duration: (\d+):(\d+):([\d.]+)', out).groups()
    dur = 3600 * int(h) + 60 * int(m) + float(sec)
    starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]
    ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
    return list(zip(starts, ends + [dur] * (len(starts) - len(ends)))), dur


def voiced(path):
    out = subprocess.run(['ffmpeg', '-i', path, '-af', 'silencedetect=noise=-32dB:d=0.12', '-f', 'null', '-'],
                         capture_output=True, text=True).stderr
    h, m, sec = re.search(r'Duration: (\d+):(\d+):([\d.]+)', out).groups()
    dur = 3600 * int(h) + 60 * int(m) + float(sec)
    starts = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', out)]
    ends = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', out)]
    sil = list(zip(starts, ends + [dur] * (len(starts) - len(ends))))
    segs, t = [], 0.0
    for a, b in sil:
        if a - t > 0.05:
            segs.append((t, a))
        t = b
    if dur - t > 0.05:
        segs.append((t, dur))
    return segs


def weight(w):
    core = re.sub(r'[^\wăâîșțĂÂÎȘȚ]', '', w)
    return len(SPOKEN.get(core, core)) + 1.5  # +1.5: per-word onset/transition time


def timeline(segs, words):
    total = sum(b - a for a, b in segs)
    ws = [weight(w) for w in words]
    scale = total / sum(ws)
    times, acc = [], 0.0

    def at(x):  # voiced-time offset -> real time
        for a, b in segs:
            if x <= b - a:
                return a + x
            x -= b - a
        return segs[-1][1]
    for w in ws:
        s = at(acc + 1e-3)
        acc += w * scale
        times.append((s, at(acc)))
    return times


def chunks(words, times):
    out, cur = [], []
    for i, w in enumerate(words):
        cur.append(i)
        text = ' '.join(words[j] for j in cur)
        nxt = words[i + 1] if i + 1 < len(words) else None
        brk = re.search(r'[.,!?:”]$', w) or len(cur) >= MAX_WORDS or \
            (nxt and len(text) + 1 + len(nxt) > MAX_CHARS)
        if brk or nxt is None:
            out.append({'words': [words[j] for j in cur], 'times': [list(times[j]) for j in cur]})
            cur = []
    return out


def snap(words, segs, sil):
    """Pin every sentence end to a real pause: DP over pauses >= 0.2 s, close to the estimated
    boundary and preferring longer pauses; words are then spread inside each sentence only."""
    est = timeline(segs, words)
    ends = [i for i, w in enumerate(words[:-1]) if re.search(r'[.!?”]$', w)]
    cands = [(a, b) for a, b in sil if b - a >= 0.2 and a > segs[0][0] and b < segs[-1][1]]
    INF = float('inf')
    # dp[i][j]: best cost with boundary i placed on pause j
    dp = [[INF] * len(cands) for _ in ends]
    bp = [[-1] * len(cands) for _ in ends]
    for i, wi in enumerate(ends):
        e = (est[wi][1] + est[wi + 1][0]) / 2
        for j, (a, b) in enumerate(cands):
            c = ((a + b) / 2 - e) ** 2 - 0.6 * (b - a)
            if i == 0:
                dp[i][j] = c
            else:
                k = min(range(j), key=lambda k: dp[i - 1][k], default=None)
                if k is not None and dp[i - 1][k] < INF:
                    dp[i][j], bp[i][j] = dp[i - 1][k] + c, k
    if not ends or not cands or min(dp[-1]) == INF:
        return est
    j = min(range(len(cands)), key=lambda j: dp[-1][j])
    pins = []
    for i in range(len(ends) - 1, -1, -1):
        pins.append(cands[j]); j = bp[i][j]
    pins.reverse()
    times, lo = [], 0
    bounds = [segs[0][0]] + [x for p in pins for x in p] + [segs[-1][1]]
    for n, hi in enumerate(ends + [len(words) - 1]):
        t0, t1 = bounds[2 * n], bounds[2 * n + 1]
        sub = [(max(a, t0), min(b, t1)) for a, b in segs if b > t0 and a < t1] or [(t0, t1)]
        times += timeline(sub, words[lo:hi + 1])
        lo = hi + 1
    return times


if __name__ == '__main__':
    S = json.load(open(os.path.join(D, 'scripts.json')))
    os.makedirs(os.path.join(D, 'subs'), exist_ok=True)
    for vid in sys.argv[1:]:
        words = S[vid]['text'].split()
        path = os.path.join(D, 'raw', vid + '.mp4')
        segs, (sil, _) = voiced(path), silences(path)
        res = chunks(words, snap(words, segs, sil))
        json.dump(res, open(os.path.join(D, 'subs', vid + '.json'), 'w'), ensure_ascii=False, indent=1)
        print(vid, len(segs), 'voiced segments,', len(res), 'subtitle lines')
