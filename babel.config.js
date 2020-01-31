// 这是项目发布阶段需要用到的babel插件
const proPlugins = []
if (process.env.NODE_ENV === 'production') {
  // 移除console
  proPlugins.push('transform-remove-console')
}

module.exports = {
  'presets': [
    '@vue/app'
  ],
  'plugins': [
    [
      'component',
      {
        'libraryName': 'element-ui',
        'styleLibraryName': 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组，...数组中每一项元素都添加进来
    ...proPlugins
  ]
}
