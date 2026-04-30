varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uAmount;

void main() {
  vec2 dir = normalize(vUv - 0.5) * uAmount;
  float r = texture2D(uTexture, vUv + dir).r;
  float g = texture2D(uTexture, vUv).g;
  float b = texture2D(uTexture, vUv - dir).b;
  float a = texture2D(uTexture, vUv).a;
  gl_FragColor = vec4(r, g, b, a);
}
