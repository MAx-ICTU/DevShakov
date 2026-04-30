varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uProgress;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec4 color = texture2D(uTexture, vUv);
  float dither = hash(floor(gl_FragCoord.xy));
  float alpha = step(uProgress, dither) * color.a;
  gl_FragColor = vec4(color.rgb, alpha);
}
