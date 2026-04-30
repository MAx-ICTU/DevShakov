varying vec2 vUv;
uniform float uProgress;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += sin(uv.y * 16.0) * uProgress * 0.08;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
