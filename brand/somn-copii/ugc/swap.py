# Replace the AI-rendered box front with the real box front via SIFT homography + light matching.
import cv2, numpy as np, sys
ref_p, scene_p, out_p = sys.argv[1:4]
ref = cv2.imread(ref_p); scn = cv2.imread(scene_p)
# ref front face corners (inside the crop): trim the dark background/side sliver
H0, W0 = ref.shape[:2]
sift = cv2.SIFT_create(8000)
g1 = cv2.cvtColor(ref, cv2.COLOR_BGR2GRAY); g2 = cv2.cvtColor(scn, cv2.COLOR_BGR2GRAY)
k1, d1 = sift.detectAndCompute(g1, None); k2, d2 = sift.detectAndCompute(g2, None)
m = cv2.BFMatcher().knnMatch(d1, d2, k=2)
good = [a for a, b in m if a.distance < 0.72 * b.distance]
src = np.float32([k1[g.queryIdx].pt for g in good]); dst = np.float32([k2[g.trainIdx].pt for g in good])
H, inl = cv2.findHomography(src, dst, cv2.RANSAC, 4.0)
print(scene_p, 'matches', len(good), 'inliers', int(inl.sum()))
# front face polygon in ref coords (measured on ref-fata-cutie.png)
quad = np.float32([[14, 14], [440, 38], [440, 1228], [14, 1250]]).reshape(-1, 1, 2)
q2 = cv2.perspectiveTransform(quad, H)
print('corners', q2.reshape(-1, 2).round(1).tolist())
h, w = scn.shape[:2]
warp = cv2.warpPerspective(ref, H, (w, h), flags=cv2.INTER_LANCZOS4)
mask = np.zeros((h, w), np.uint8); cv2.fillConvexPoly(mask, q2.astype(np.int32).reshape(-1, 2), 255)
mask = cv2.erode(mask, np.ones((3, 3), np.uint8), 2)
# light matching in LAB using the masked region (same object in both)
L1 = cv2.cvtColor(warp, cv2.COLOR_BGR2LAB).astype(np.float32); L2 = cv2.cvtColor(scn, cv2.COLOR_BGR2LAB).astype(np.float32)
mm = mask > 0
for c in range(3):
    a, b = L1[..., c][mm], L2[..., c][mm]
    L1[..., c] = (L1[..., c] - a.mean()) * (b.std() / (a.std() + 1e-6)) * (0.95 if c == 0 else 1) + b.mean()
warp = cv2.cvtColor(np.clip(L1, 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR)
# match sharpness/grain of the scene a little
warp = cv2.GaussianBlur(warp, (0, 0), 0.6)
noise = np.random.default_rng(1).normal(0, 2.2, warp.shape).astype(np.float32)
warp = np.clip(warp.astype(np.float32) + noise, 0, 255).astype(np.uint8)
# keep skin (fingers) that overlaps the box edges
ycc = cv2.cvtColor(scn, cv2.COLOR_BGR2YCrCb)
skin = cv2.inRange(ycc, (40, 138, 85), (255, 175, 128))
dist = cv2.distanceTransform(mask, cv2.DIST_L2, 5)
band = (dist < max(8, 0.10 * np.sqrt(mask.sum() / 255 / 2.6))).astype(np.uint8) * 255
keep = cv2.bitwise_and(skin, band); keep = cv2.morphologyEx(keep, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
m2 = cv2.subtract(mask, keep)
alpha = cv2.GaussianBlur(m2, (0, 0), 1.2).astype(np.float32)[..., None] / 255
out = (warp * alpha + scn * (1 - alpha)).astype(np.uint8)
cv2.imwrite(out_p, out, [cv2.IMWRITE_JPEG_QUALITY, 95])
x, y, bw, bh = cv2.boundingRect(q2.astype(np.int32))
pad = int(bh * 0.15)
cmp = np.hstack([scn[max(0, y - pad):y + bh + pad, max(0, x - pad):x + bw + pad], out[max(0, y - pad):y + bh + pad, max(0, x - pad):x + bw + pad]])
cv2.imwrite(out_p.replace('.jpg', '_cmp.jpg'), cmp)
