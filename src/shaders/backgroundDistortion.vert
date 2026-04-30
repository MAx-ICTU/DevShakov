varying vec2 vUv;
uniform float uTime;
uniform float uDistortionStrength;

void main() {
  vUv = uv;
  vec3 pos = position;
  float wave = sin((position.x * 2.4) + uTime * 0.55) * 0.035;
  pos.z += wave * uDistortionStrength;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
