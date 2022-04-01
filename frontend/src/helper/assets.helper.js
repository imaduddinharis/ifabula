const assets = (asset)=>{
    return require(`@/assets/${asset}`)
}
module.exports = {
  BG: assets('background.webp'),
  LOGO: assets('logo-full.png'),
  LOADING: assets('loading.svg')
};
