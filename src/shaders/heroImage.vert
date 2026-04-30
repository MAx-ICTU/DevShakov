varying vec2 vUv;
uniform float uProgress;
uniform float uTime;

float wave(vec2 uv) {
  return sin((uv.y * 12.0) + uTime * 0.85) * 0.012;
}

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += wave(uv) * uProgress;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
