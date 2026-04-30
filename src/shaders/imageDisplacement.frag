varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;
uniform float uStrength;

void main() {
  vec2 offset = vec2(
    sin((vUv.y + uTime * 0.12) * 18.0),
    cos((vUv.x + uTime * 0.08) * 16.0)
  ) * uStrength * 0.006;

  gl_FragColor = texture2D(uTexture, vUv + offset);
}
