varying vec2 vUv;
uniform float uTime;
uniform float uOpacity;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  float noise = hash(floor((vUv + uTime * 0.008) * 90.0));
  vec3 color = mix(vec3(0.015, 0.035, 0.04), vec3(0.18, 0.74, 0.9), noise * 0.18);
  float radial = 1.0 - smoothstep(0.0, 0.72, distance(vUv, vec2(0.5)));
  gl_FragColor = vec4(color, radial * uOpacity);
}
