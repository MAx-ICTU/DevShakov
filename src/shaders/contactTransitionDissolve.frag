varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uProgress;
uniform float uNoiseStrength;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.0, 289.0))) * 45758.5453);
}

void main() {
  float n = hash(floor(vUv * 120.0));
  float mask = smoothstep(uProgress - 0.2, uProgress + 0.18, n);
  vec4 color = texture2D(uTexture, vUv + (n - 0.5) * uNoiseStrength * uProgress * 0.012);
  gl_FragColor = vec4(color.rgb, color.a * (1.0 - mask));
}
