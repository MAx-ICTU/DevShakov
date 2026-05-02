varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform float uProgress;
uniform float uDistortionStrength;
uniform float uOpacity;
uniform float uPlaneAspect;
uniform float uImageAspect;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

vec2 coverUv(vec2 uv) {
  vec2 scale = vec2(1.0);
  if (uPlaneAspect > uImageAspect) {
    scale.y = uImageAspect / uPlaneAspect;
  } else {
    scale.x = uPlaneAspect / uImageAspect;
  }
  return (uv - 0.5) * scale + 0.5;
}

void main() {
  vec2 uv = coverUv(vUv);
  vec2 mouse = vec2(uMouse.x, 1.0 - uMouse.y);
  float distanceToMouse = distance(vUv, mouse);
  float hoverMask = smoothstep(0.42, 0.0, distanceToMouse) * uHover;
  float n = noise((vUv * 8.0) + uTime * 0.08);
  float dissolveNoise = noise((vUv * 42.0) + uTime * 0.18);

  vec2 direction = normalize(vUv - mouse + 0.0001);
  vec2 hoverOffset = direction * hoverMask * uDistortionStrength * 0.035 * (0.35 + n);
  vec2 progressOffset = vec2(n - 0.5, dissolveNoise - 0.5) * uProgress * uDistortionStrength * 0.045;
  vec2 finalUv = uv + hoverOffset + progressOffset;

  float rgbShift = (hoverMask * 0.0035 + uProgress * 0.006) * uDistortionStrength;
  vec4 color;
  color.r = texture2D(uTexture, finalUv + vec2(rgbShift, 0.0)).r;
  color.g = texture2D(uTexture, finalUv).g;
  color.b = texture2D(uTexture, finalUv - vec2(rgbShift, 0.0)).b;
  color.a = texture2D(uTexture, finalUv).a;

  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  color.rgb = vec3(gray) * 0.92;
  color.rgb = (color.rgb - 0.5) * 1.08 + 0.5;
  color.rgb *= 0.82;

  float edgeFade = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
  float verticalFade = smoothstep(0.0, 0.14, vUv.y) * smoothstep(1.0, 0.76, vUv.y);
  float softCorner = smoothstep(
    0.0,
    0.18,
    min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y))
  );
  float dissolve = 1.0 - smoothstep(0.5, 1.0, uProgress + dissolveNoise * 0.2);
  float alpha = color.a * edgeFade * verticalFade * softCorner * dissolve * uOpacity;

  if (alpha < 0.01) discard;
  gl_FragColor = vec4(color.rgb, alpha);
}
